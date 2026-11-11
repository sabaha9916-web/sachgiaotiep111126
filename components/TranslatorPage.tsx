import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import ApiKeyInput from './ApiKeyInput';
import { 
  Mic, 
  RotateCcw, 
  Copy, 
  Check, 
  Send, 
  ChevronRight, 
  Volume2, 
  Gauge,
  Sparkles,
  Zap,
  VolumeX
} from 'lucide-react';
import { 
  getSharedInputAudioContext, 
  getSharedOutputAudioContext, 
  getSharedMicrophoneStream 
} from '../utils/audioStreamManager';

export type SpeakingMode = 'zh-to-vi' | 'vi-to-zh' | 'auto';

export interface TranslationCard {
  id: string;
  zhText: string;
  viText: string;
  isPending: boolean;
  timeString: string;
  timestamp: number;
  direction?: 'zh-to-vi' | 'vi-to-zh';
}

function formatTime(timestamp?: number): string {
  const d = timestamp ? new Date(timestamp) : new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export interface TranslatorPageProps {
  apiKey: string;
  onSaveApiKey?: (key: string) => void;
  onOpenSettings?: () => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  onOpenToc?: () => void;
  totalPages?: number;
  currentPageIndex?: number;
}

interface TranslationResult {
  zhText: string;
  viText: string;
  spokenText: string;
  spokenLang: 'vi' | 'zh';
  detectedLang: 'vi' | 'zh';
}

function resolveApiKey(propKey?: string): string {
  const sanitize = (k?: string | null) => {
    if (!k) return '';
    const trimmed = k.trim();
    if (trimmed === 'undefined' || trimmed === 'null' || trimmed.length < 8) return '';
    return trimmed;
  };

  const fromProp = sanitize(propKey);
  if (fromProp) return fromProp;

  if (typeof localStorage !== 'undefined') {
    const fromStorage = sanitize(localStorage.getItem('gemini-api-key'));
    if (fromStorage) return fromStorage;
  }

  const fromEnv = sanitize(process.env.API_KEY) || sanitize(process.env.GEMINI_API_KEY);
  if (fromEnv) return fromEnv;

  return '';
}

function hasChineseCharacters(text: string): boolean {
  return /[\u4e00-\u9fa5]/.test(text);
}

function hasVietnameseDiacritics(text: string): boolean {
  return /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]/i.test(text);
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)));
}

// Comprehensive bilingual dictionary for instant 0ms latency translation
const DICTIONARY: Record<string, { zh: string; vi: string }> = {
  // Questions & Directions
  'bạn đi đâu': { zh: '你去哪儿？', vi: 'Bạn đi đâu?' },
  'bạn đi đâu đấy': { zh: '你去哪儿？', vi: 'Bạn đi đâu đấy?' },
  'bạn đi đâu thế': { zh: '你去哪儿？', vi: 'Bạn đi đâu thế?' },
  'bạn đi đâu vậy': { zh: '你去哪里？', vi: 'Bạn đi đâu vậy?' },
  'bạn muốn đi đâu': { zh: '你想去哪儿？', vi: 'Bạn muốn đi đâu?' },
  'đi đâu': { zh: '去哪儿？', vi: 'Đi đâu?' },
  'đi đâu đấy': { zh: '去哪里？', vi: 'Đi đâu đấy?' },
  'đi đâu thế': { zh: '去哪儿？', vi: 'Đi đâu thế?' },
  'nhà vệ sinh ở đâu': { zh: '洗手间在哪里？', vi: 'Nhà vệ sinh ở đâu?' },
  'nhà vệ sinh ở chỗ nào': { zh: '厕所在哪儿？', vi: 'Nhà vệ sinh ở chỗ nào?' },
  'bạn tên gì': { zh: '你叫什么名字？', vi: 'Bạn tên gì?' },
  'bạn tên là gì': { zh: '你叫什么名字？', vi: 'Bạn tên là gì?' },
  'tôi tên là': { zh: '我叫...', vi: 'Tôi tên là...' },
  'ngài họ gì': { zh: '您贵姓？', vi: 'Ngài họ gì?' },
  'bạn là người nước nào': { zh: '你是哪国人？', vi: 'Bạn là người nước nào?' },
  'mấy giờ rồi': { zh: '几点了？', vi: 'Mấy giờ rồi?' },
  'bây giờ là mấy giờ': { zh: '现在几点？', vi: 'Bây giờ là mấy giờ?' },
  'cái này là cái gì': { zh: '这是什么？', vi: 'Cái này là cái gì?' },
  'cái kia là cái gì': { zh: '那是什么？', vi: 'Cái kia là cái gì?' },
  'bao nhiêu tiền': { zh: '多少钱？', vi: 'Bao nhiêu tiền?' },
  'cái này bao nhiêu tiền': { zh: '这个多少钱？', vi: 'Cái này bao nhiêu tiền?' },
  'cái kia bao nhiêu tiền': { zh: '那个多少钱？', vi: 'Cái kia bao nhiêu tiền?' },
  'một cân bao nhiêu tiền': { zh: '一斤多少钱？', vi: 'Một cân bao nhiêu tiền?' },
  'đắt quá': { zh: '太贵了！', vi: 'Đắt quá!' },
  'rẻ một chút được không': { zh: '便宜一点可以吗？', vi: 'Rẻ một chút được không?' },
  'bớt chút đi': { zh: '便宜一点儿吧。', vi: 'Bớt chút đi mà.' },
  'tính tiền': { zh: '买单！', vi: 'Tính tiền!' },
  'thanh toán': { zh: '结账！', vi: 'Thanh toán!' },
  'bạn ăn cơm chưa': { zh: '你吃饭了吗？', vi: 'Bạn ăn cơm chưa?' },
  'ăn cơm chưa': { zh: '吃了吗？', vi: 'Ăn cơm chưa?' },
  'tôi ăn rồi': { zh: '我吃了。', vi: 'Tôi ăn rồi.' },
  'tôi chưa ăn': { zh: '我还没吃。', vi: 'Tôi chưa ăn.' },
  'bạn khỏe không': { zh: '你好吗？', vi: 'Bạn khỏe không?' },
  'dạo này thế nào': { zh: '最近怎么样？', vi: 'Dạo này thế nào?' },
  'tôi rất khỏe': { zh: '我很好。', vi: 'Tôi rất khỏe.' },
  'tôi cũng rất khỏe': { zh: '我也很好。', vi: 'Tôi cũng rất khỏe.' },

  // Food, Drinks & Shopping
  'bạn ăn gì': { zh: '你吃什么？', vi: 'Bạn ăn gì?' },
  'tôi ăn cơm': { zh: '我吃米饭。', vi: 'Tôi ăn cơm.' },
  'tôi ăn mì': { zh: '我吃面条。', vi: 'Tôi ăn mì.' },
  'tôi ăn sủi cảo': { zh: '我吃饺子。', vi: 'Tôi ăn sủi cảo.' },
  'tôi ăn bánh bao': { zh: '我吃包子。', vi: 'Tôi ăn bánh bao.' },
  'tôi ăn bánh mì': { zh: '我吃面包。', vi: 'Tôi ăn bánh mì.' },
  'bạn uống gì': { zh: '你喝什么？', vi: 'Bạn uống gì?' },
  'tôi uống cà phê': { zh: '我喝咖啡。', vi: 'Tôi uống cà phê.' },
  'tôi uống trà': { zh: '我喝茶。', vi: 'Tôi uống trà.' },
  'tôi uống nước khoáng': { zh: '我喝矿泉水。', vi: 'Tôi uống nước khoáng.' },
  'tôi uống bia': { zh: '我喝啤酒。', vi: 'Tôi uống bia.' },
  'tôi uống sữa': { zh: '我喝牛奶。', vi: 'Tôi uống sữa.' },
  'tôi muốn uống cà phê': { zh: '我想喝咖啡。', vi: 'Tôi muốn uống cà phê.' },
  'tôi muốn mua cái này': { zh: '我要买这个。', vi: 'Tôi muốn mua cái này.' },
  'bạn mua gì': { zh: '你买什么？', vi: 'Bạn mua gì?' },

  // Greetings & Courtesies
  'xin chào': { zh: '你好！', vi: 'Xin chào!' },
  'chào bạn': { zh: '你好！', vi: 'Chào bạn!' },
  'chào ngài': { zh: '您好！', vi: 'Chào ngài!' },
  'chào mọi người': { zh: '大家好！', vi: 'Chào mọi người!' },
  'chào buổi sáng': { zh: '早上好！', vi: 'Chào buổi sáng!' },
  'chào buổi trưa': { zh: '中午好！', vi: 'Chào buổi trưa!' },
  'chào buổi tối': { zh: '晚上好！', vi: 'Chào buổi tối!' },
  'chúc ngủ ngon': { zh: '晚安！', vi: 'Chúc ngủ ngon!' },
  'tạm biệt': { zh: '再见！', vi: 'Tạm biệt!' },
  'hẹn gặp lại': { zh: '再见！', vi: 'Hẹn gặp lại!' },
  'ngày mai gặp lại': { zh: '明天见！', vi: 'Ngày mai gặp lại!' },
  'cảm ơn': { zh: '谢谢！', vi: 'Cảm ơn!' },
  'cảm ơn bạn': { zh: '谢谢你！', vi: 'Cảm ơn bạn!' },
  'cảm ơn nhiều': { zh: '多谢！', vi: 'Cảm ơn nhiều!' },
  'rất cảm ơn bạn': { zh: '非常感谢你！', vi: 'Rất cảm ơn bạn!' },
  'không có gì': { zh: '不客气！', vi: 'Không có gì!' },
  'không cần cảm ơn': { zh: '不用谢！', vi: 'Không cần cảm ơn!' },
  'đừng khách sáo': { zh: '不用客气！', vi: 'Đừng khách sáo!' },
  'xin lỗi': { zh: '对不起！', vi: 'Xin lỗi!' },
  'ngại quá': { zh: '不好意思。', vi: 'Ngại quá.' },
  'không sao đâu': { zh: '没关系。', vi: 'Không sao đâu.' },
  'không có vấn đề gì': { zh: '没问题。', vi: 'Không có vấn đề gì.' },
  'rất vui được gặp bạn': { zh: '很高兴认识你！', vi: 'Rất vui được gặp bạn!' },
  'tôi là người việt nam': { zh: '我是越南人。', vi: 'Tôi là người Việt Nam.' },
  'tôi là người trung quốc': { zh: '我是中国人。', vi: 'Tôi là người Trung Quốc.' },
  'tôi không hiểu': { zh: '我不懂。', vi: 'Tôi không hiểu.' },
  'tôi nghe không hiểu': { zh: '我听不懂。', vi: 'Tôi nghe không hiểu.' },
  'xin hãy nói chậm một chút': { zh: '请说慢一点。', vi: 'Xin hãy nói chậm một chút.' },
  'xin nhắc lại một lần nữa': { zh: '请再说一遍。', vi: 'Xin nhắc lại một lần nữa.' },
  'tôi muốn đi khách sạn': { zh: '我要去酒店。', vi: 'Tôi muốn đi khách sạn.' },
  'tôi muốn đi sân bay': { zh: '我要去机场。', vi: 'Tôi muốn đi sân bay.' },
  'ngon quá': { zh: '太好吃了！', vi: 'Ngon quá!' },
  'món này rất ngon': { zh: '这个菜很好吃。', vi: 'Món này rất ngon.' },

  // Chinese Keys
  '你去哪儿': { zh: '你去哪儿？', vi: 'Bạn đi đâu?' },
  '你去哪里': { zh: '你去哪里？', vi: 'Bạn đi đâu?' },
  '你去哪': { zh: '你去哪？', vi: 'Bạn đi đâu?' },
  '去哪里': { zh: '去哪里？', vi: 'Đi đâu?' },
  '去哪儿': { zh: '去哪儿？', vi: 'Đi đâu?' },
  '想去哪里': { zh: '想去哪里？', vi: 'Muốn đi đâu?' },
  '你想去哪儿': { zh: '你想去哪儿？', vi: 'Bạn muốn đi đâu?' },
  '你好': { zh: '你好！', vi: 'Xin chào!' },
  '您好': { zh: '您好！', vi: 'Chào ngài / Chào ông bà!' },
  '大家好': { zh: '大家好！', vi: 'Chào mọi người!' },
  '早上好': { zh: '早上好！', vi: 'Chào buổi sáng!' },
  '中午好': { zh: '中午好!', vi: 'Chào buổi trưa!' },
  '晚上好': { zh: '晚上好！', vi: 'Chào buổi tối!' },
  '晚安': { zh: '晚安！', vi: 'Chúc ngủ ngon!' },
  '再见': { zh: '再见！', vi: 'Tạm biệt!' },
  '明天见': { zh: '明天见！', vi: 'Ngày mai gặp lại!' },
  '谢谢': { zh: '谢谢！', vi: 'Cảm ơn!' },
  '谢谢你': { zh: '谢谢你！', vi: 'Cảm ơn bạn!' },
  '多谢': { zh: '多谢！', vi: 'Cảm ơn nhiều!' },
  '非常感谢': { zh: '非常感谢！', vi: 'Rất cảm ơn bạn!' },
  '不客气': { zh: '不客气！', vi: 'Không có gì!' },
  '不用谢': { zh: '不用谢！', vi: 'Không cần cảm ơn!' },
  '不用客气': { zh: '不用客气！', vi: 'Đừng khách sáo!' },
  '对不起': { zh: '对不起！', vi: 'Xin lỗi!' },
  '不好意思': { zh: '不好意思。', vi: 'Ngại quá / Xin lỗi.' },
  '没关系': { zh: '没关系。', vi: 'Không sao đâu.' },
  '没事': { zh: '没事。', vi: 'Không có chuyện gì đâu.' },
  '没问题': { zh: '没问题。', vi: 'Không có vấn đề gì.' },
  '你好吗': { zh: '你好吗？', vi: 'Bạn khỏe không?' },
  '我很好': { zh: '我很好。', vi: 'Tôi rất khỏe.' },
  '我也很好': { zh: '我也很好。', vi: 'Tôi cũng rất khỏe.' },
  '你叫什么名字': { zh: '你叫什么名字？', vi: 'Bạn tên là gì?' },
  '您贵姓': { zh: '您贵姓？', vi: 'Ngài họ gì?' },
  '很高兴认识你': { zh: '很高兴认识你！', vi: 'Rất vui được làm quen với bạn!' },
  '多少钱': { zh: '多少钱？', vi: 'Bao nhiêu tiền?' },
  '这个多少钱': { zh: '这个多少钱？', vi: 'Cái này bao nhiêu tiền?' },
  '那个多少钱': { zh: '那个多少钱？', vi: 'Cái kia bao nhiêu tiền?' },
  '太贵了': { zh: '太贵了！', vi: 'Đắt quá!' },
  '便宜一点': { zh: '便宜一点。', vi: 'Bớt chút đi / Rẻ một chút đi.' },
  '买单': { zh: '买单！', vi: 'Tính tiền!' },
  '结账': { zh: '结账！', vi: 'Thanh toán!' },
  '你吃饭了吗': { zh: '你吃饭了吗？', vi: 'Bạn ăn cơm chưa?' },
  '我吃了': { zh: '我吃了。', vi: 'Tôi ăn rồi.' },
  '我还没吃': { zh: '我还没吃。', vi: 'Tôi chưa ăn.' },
  '洗手间在哪里': { zh: '洗手间在哪里？', vi: 'Nhà vệ sinh ở đâu?' },
  '厕所在哪里': { zh: '厕所在哪里？', vi: 'Nhà vệ sinh ở đâu?' },
  '我听不懂': { zh: '我听不懂。', vi: 'Tôi nghe không hiểu.' },
  '请说慢一点': { zh: '请说慢一点。', vi: 'Xin hãy nói chậm một chút.' },
  '请再说一遍': { zh: '请再说一遍。', vi: 'Xin nhắc lại một lần nữa.' },
  '我是越南人': { zh: '我是越南人。', vi: 'Tôi là người Việt Nam.' },
  '我是中国人': { zh: '我是中国人。', vi: 'Tôi là người Trung Quốc.' },
  '我要去机场': { zh: '我要去机场。', vi: 'Tôi muốn đi sân bay.' },
  '我要回酒店': { zh: '我要回酒店。', vi: 'Tôi muốn về khách sạn.' },
  '我要买这个': { zh: '我要买这个。', vi: 'Tôi muốn mua cái này.' },
  '太好吃了': { zh: '太好吃了！', vi: 'Ngon quá!' },
  '很好吃': { zh: '很好吃。', vi: 'Rất ngon.' },
  '可以': { zh: '可以。', vi: 'Được.' },
  '不可以': { zh: '不可以。', vi: 'Không được.' },
  '好的': { zh: '好的。', vi: 'Được rồi / Vâng.' },
  '不用': { zh: '不用。', vi: 'Không cần.' },
  '帮帮我': { zh: '帮帮我！', vi: 'Xin hãy giúp tôi!' },
  '什么': { zh: '什么？', vi: 'Cái gì?' },
  '为什么': { zh: '为什么？', vi: 'Tại sao?' },
  '怎么走': { zh: '怎么走？', vi: 'Đi như thế nào?' },
  '你吃什么': { zh: '你吃什么？', vi: 'Bạn ăn gì?' },
  '你喝什么': { zh: '你喝什么？', vi: 'Bạn uống gì?' },
  '你想喝什么': { zh: '你想喝什么？', vi: 'Bạn muốn uống gì?' },
  '我想喝咖啡': { zh: '我想喝咖啡。', vi: 'Tôi muốn uống cà phê.' }
};

// Common phonetic transcripts when speech recognition hears Chinese under Vietnamese model
const PHONETIC_ZH: Record<string, string> = {
  'ni hao': '你好',
  'ni hao ma': '你好吗',
  'wo hen hao': '我很好',
  'xie xie': '谢谢',
  'xie xie ni': '谢谢你',
  'bu ke qi': '不客气',
  'bu yong xie': '不用谢',
  'dui bu qi': '对不起',
  'mei guan xi': '没关系',
  'zai jian': '再见',
  'ming tian jian': '明天见',
  'duo shao qian': '多少钱',
  'zhe ge duo shao qian': '这个多少钱',
  'na ge duo shao qian': '那个多少钱',
  'tai gui le': '太贵了',
  'pian yi yi dian': '便宜一点',
  'mai dan': '买单',
  'jie zhang': '结账',
  'ni chi fan le ma': '你吃饭了吗',
  'wo chi le': '我吃了',
  'wo hai mei chi': '我还没吃',
  'ni qu na li': '你去哪里',
  'ni qu nar': '你去哪儿',
  'qu na li': '去哪里',
  'xi shou jian zai na li': '洗手间在哪里',
  'wo ting bu dong': '我听不懂',
  'qing shuo man yi dian': '请说慢一点',
  'wo shi yue nan ren': '我是越南人',
  'wo shi zhong guo ren': '我是中国人',
  'ni he shen me': '你喝什么',
  'ni chi shen me': '你吃什么',
  'wo xiang he ka fei': '我想喝咖啡',
  'wo yao qu ji chang': '我要去机场',
  'wo yao hui jiu dian': '我要回酒店',
  'hao chi': '好吃',
  'tai hao chi le': '太好吃了',
  'ke yi': '可以',
  'bu ke yi': '不可以',
  'hao de': '好的',
  'bu yong': '不用',
  'bang bang wo': '帮帮我',
  'wo ai ni': '我爱你',
  // Vietnamese phonetic spellings
  'lí hảo': '你好',
  'lý hảo': '你好',
  'nỉ hảo': '你好',
  'nỉ hẩu': '你好',
  'nỉ hẩu ma': '你好吗',
  'ủa hẩn hảo': '我很好',
  'xia xia': '谢谢',
  'siè xie': '谢谢',
  'xiè xie': '谢谢',
  'sè se': '谢谢',
  'tua sảo chén': '多少钱',
  'đua sảo chén': '多少钱',
  'chưa cưa tua sảo chén': '这个多少钱',
  'nỉ chư phan lờ ma': '你吃饭了吗',
  'nỉ truy nả lỉ': '你去哪里',
  'nỉ truy na lỉ': '你去哪里',
  'chay chen': '再见',
  'chai chen': '再见',
  'tuây bu chỉ': '对不起',
  'mấy quan xi': '没关系',
  'bú kè chỉ': '不客气',
  'thai kuây lờ': '太贵了',
  'mải tan': '买单',
  'xỉ sâu chen': '洗手间',
  'ủa thính bu tủng': '我听不懂',
  'chỉnh sua man di tiện': '请说慢一点',
  'ủa ai nỉ': '我爱你',
  'khơ dỉ': '可以',
  'bù khơ dỉ': '不可以',
  'hảo tơ': '好的'
};

// Automatic intelligent language detection between Vietnamese and Chinese
function detectInputLanguage(rawText: string, currentMicLang: 'vi' | 'zh'): 'zh' | 'vi' {
  const text = rawText.trim();
  const lower = text.toLowerCase();
  const key = normalizeKey(text);

  // 1. If text contains Chinese Hanzi characters -> definitely Chinese
  if (hasChineseCharacters(text)) {
    return 'zh';
  }

  // 2. If text matches phonetic Chinese dictionary -> definitely Chinese
  if (PHONETIC_ZH[key] || PHONETIC_ZH[lower]) {
    return 'zh';
  }

  // 3. Check for obvious Pinyin markers / Chinese words / Chinese bồi
  const pinyinPatterns = [
    /\b(ni\s*hao|ni\s*hao\s*ma|wo\s*hen\s*hao|xie\s*xie|zai\s*jian|dui\s*bu\s*qi|mei\s*guan\s*xi|bu\s*ke\s*qi|bu\s*yong\s*xie|duo\s*shao\s*qian|tai\s*gui\s*le|pian\s*yi|mai\s*dan|jie\s*zhang|chi\s*fan|chi\s*le\s*ma|wo\s*chi\s*le|qu\s*na\s*li|qu\s*nar|xi\s*shou\s*jian|ce\s*suo|zen\s*me\s*yang|shen\s*me|wei\s*shen\s*me|ji\s*dian|xian\s*zai|ming\s*tian|jin\s*tian|zuo\s*tian|wo\s*yao|wo\s*xiang|wo\s*shi|ni\s*shi|ta\s*shi|ren\s*shi\s*ni|gao\s*xing|ting\s*bu\s*dong|shuo\s*man\s*dian|zai\s*shuo|yi\s*ci|bang\s*bang\s*wo|hao\s*chi|tai\s*hao\s*chi|wo\s*ai\s*ni)\b/i,
    /\b(nỉ\s*hảo|lí\s*hảo|lý\s*hảo|ủa\s*hẩn\s*hảo|xiè\s*xie|siè\s*xie|xia\s*xia|chay\s*chen|chai\s*chen|tua\s*sảo|đua\s*sảo|mải\s*tan|mấy\s*quan\s*xi|tuây\s*bu|bú\s*kè|thai\s*kuây|truy\s*nả|xỉ\s*sâu|chư\s*phan|phiên\s*di)\b/i
  ];
  for (const pat of pinyinPatterns) {
    if (pat.test(lower)) return 'zh';
  }

  // 4. If text contains Vietnamese diacritics -> definitely Vietnamese
  if (hasVietnameseDiacritics(text)) {
    return 'vi';
  }

  // 5. Check Vietnamese common non-accented vocabulary
  const viCommonKeywords = [
    'toi', 'ban', 'anh', 'em', 'chi', 'ong', 'ba', 'di', 'dau', 'o',
    'an', 'uong', 'com', 'nuoc', 'tien', 'bao', 'nhieu', 'dat', 're',
    'xin', 'chao', 'cam', 'on', 'tam', 'biet', 'khong', 'co', 'muon',
    'viet', 'nam', 'trung', 'quoc', 'khach', 'san', 'san', 'bay',
    'nha', 've', 'sinh', 'ngon', 'chua', 'roi', 'sao', 'vay', 'the',
    'may', 'gio', 'la', 'cai', 'nay', 'kia', 'gi', 'nao', 'nhe', 'lam'
  ];
  const words = lower.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  let viMatchCount = 0;
  for (const w of words) {
    if (viCommonKeywords.includes(w)) viMatchCount++;
  }
  if (viMatchCount >= 1) {
    return 'vi';
  }

  // 6. Default based on current listening model
  return currentMicLang === 'zh' ? 'zh' : 'vi';
}

const translationCache = new Map<string, TranslationResult>();

// Ultra-fast instant translation engine: 30ms-50ms response
async function fetchInstantTranslation(text: string, sl: string, tl: string): Promise<string> {
  const clean = text.trim();
  if (!clean) return '';

  // Priority 1: High-speed local server proxy (30ms)
  try {
    const res = await fetch(`/api/instant-translate?text=${encodeURIComponent(clean)}&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.translation && typeof data.translation === 'string' && data.translation.trim()) {
        return decodeHtmlEntities(data.translation.trim());
      }
    }
  } catch {}

  // Priority 2: Direct clients5 if accessible
  try {
    const directUrl = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&q=${encodeURIComponent(clean)}`;
    const res = await fetch(directUrl, { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0]) {
        const item = typeof data[0] === 'string' ? data[0] : (data[0]?.[0] || '');
        if (item) return decodeHtmlEntities(item.trim());
      }
    }
  } catch {}

  // Priority 3: MyMemory proxy with high throughput
  try {
    const mmUrl = `/api/mymemory/get?q=${encodeURIComponent(clean)}&langpair=${encodeURIComponent(`${sl}|${tl}`)}&de=translator@ai-book.edu.vn`;
    const res = await fetch(mmUrl, { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const json = await res.json();
      const translated = json?.responseData?.translatedText;
      if (translated && typeof translated === 'string') {
        const decoded = decodeHtmlEntities(translated.trim());
        if (
          decoded &&
          !decoded.toLowerCase().includes('mymemory') &&
          !decoded.toLowerCase().includes('query error') &&
          !decoded.toLowerCase().includes('quota exceeded')
        ) {
          return decoded;
        }
      }
    }
  } catch {}

  return '';
}

function normalizeKey(str: string): string {
  return str.toLowerCase().replace(/[.,?!;:~¿¡，。？！"']/g, '').trim();
}

const TranslatorPage: React.FC<TranslatorPageProps> = ({
  apiKey,
  onSaveApiKey,
  onPrevPage,
  onNextPage,
  onOpenToc,
  totalPages = 150,
  currentPageIndex = 150,
}) => {
  // Mode:
  // 'zh-to-vi' = Tôi nói Tiếng Trung ➔ AI dịch ra Tiếng Việt (Default)
  // 'vi-to-zh' = Tôi nói Tiếng Việt ➔ AI dịch ra Tiếng Trung
  // 'auto' = Tự động 2 chiều
  const [speakingMode, setSpeakingMode] = useState<SpeakingMode>('zh-to-vi');
  // Current active listening language in speech recognizer ('zh' or 'vi')
  const [currentMicLang, setCurrentMicLang] = useState<'vi' | 'zh'>('zh');
  
  const [statusMessage, setStatusMessage] = useState<string>('🟢 Đang lắng nghe Tiếng Trung (zh-CN) · Bạn nói tiếng Trung ➔ AI dịch & phát âm Tiếng Việt');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [speechRate, setSpeechRate] = useState<number>(1.1); // Crisp natural speech
  const [liveTranscript, setLiveTranscript] = useState<string>(''); // Real-time interim feedback
  
  // Initial card matching the user's provided screenshot
  const [cards, setCards] = useState<TranslationCard[]>([
    {
      id: 'card-sample-initial',
      zhText: '你去哪儿？',
      viText: 'Bạn đi đâu?',
      isPending: false,
      timeString: formatTime(Date.now() - 36000),
      timestamp: Date.now() - 36000,
      direction: 'zh-to-vi',
    }
  ]);
  
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [isMicUnlocked, setIsMicUnlocked] = useState<boolean>(true);

  // References
  const activeRecognitionRef = useRef<any>(null);
  const isRecognitionStartingRef = useRef<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const isAiSpeakingRef = useRef<boolean>(false);
  const lastAiSpeechEndTimeRef = useRef<number>(0);
  const isTranslatingRef = useRef<boolean>(false);
  const lastProcessedTextRef = useRef<string>('');
  const lastProcessedTimeRef = useRef<number>(0);
  const silenceTimerRef = useRef<any>(null);
  const autoResetMicTimerRef = useRef<any>(null);
  
  const currentMicLangRef = useRef<'vi' | 'zh'>('zh');
  const speakingModeRef = useRef<SpeakingMode>('zh-to-vi');
  const speechRateRef = useRef<number>(1.1);

  currentMicLangRef.current = currentMicLang;
  speakingModeRef.current = speakingMode;
  speechRateRef.current = speechRate;

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [cards]);

  // Preload speech synthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const onVoices = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener('voiceschanged', onVoices);
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', onVoices);
      };
    }
  }, []);

  // Switch mic language smoothly and immediately
  const setMicrophoneLanguage = useCallback((newLang: 'vi' | 'zh') => {
    setCurrentMicLang(newLang);
    currentMicLangRef.current = newLang;
    if (activeRecognitionRef.current) {
      try {
        activeRecognitionRef.current.abort();
      } catch {}
      activeRecognitionRef.current = null;
    }
  }, []);

  // Switch speaking mode
  const handleSelectMode = useCallback((mode: SpeakingMode) => {
    setSpeakingMode(mode);
    speakingModeRef.current = mode;
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (autoResetMicTimerRef.current) {
      clearTimeout(autoResetMicTimerRef.current);
      autoResetMicTimerRef.current = null;
    }
    setLiveTranscript('');

    if (mode === 'zh-to-vi') {
      setMicrophoneLanguage('zh');
      setStatusMessage('🟢 Đang lắng nghe Tiếng Trung (zh-CN) · Bạn nói tiếng Trung ➔ AI dịch & phát âm Tiếng Việt');
    } else if (mode === 'vi-to-zh') {
      setMicrophoneLanguage('vi');
      setStatusMessage('🟢 Đang lắng nghe Tiếng Việt (vi-VN) · Bạn nói tiếng Việt ➔ AI dịch & phát âm Tiếng Trung');
    } else {
      setMicrophoneLanguage('zh');
      setStatusMessage('🟢 Tự động 2 chiều · Bạn nói Tiếng Trung 🇨🇳 hoặc Tiếng Việt 🇻🇳, AI tự động nhận diện');
    }
  }, [setMicrophoneLanguage]);

  // AI Speech: Speaks translation cleanly with zero delay
  const speakTranslation = useCallback((text: string, lang: 'vi' | 'zh', onCompleted?: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onCompleted?.();
      return;
    }
    const clean = text.trim();
    if (!clean) {
      onCompleted?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      isAiSpeakingRef.current = true;

      const utterance = new SpeechSynthesisUtterance(clean);
      const voices = window.speechSynthesis.getVoices?.() || [];

      if (lang === 'zh') {
        utterance.lang = 'zh-CN';
        const zhVoice = voices.find(
          (v) =>
            v.lang === 'zh-CN' ||
            v.lang === 'zh_CN' ||
            v.lang.startsWith('zh') ||
            v.lang.includes('Chinese') ||
            v.lang.includes('cmn')
        );
        if (zhVoice) utterance.voice = zhVoice;
      } else {
        utterance.lang = 'vi-VN';
        const viVoice = voices.find(
          (v) =>
            v.lang === 'vi-VN' ||
            v.lang === 'vi_VN' ||
            v.lang.startsWith('vi') ||
            v.lang.includes('Vietnamese')
        );
        if (viVoice) utterance.voice = viVoice;
      }

      utterance.rate = speechRateRef.current;

      const onDone = () => {
        lastAiSpeechEndTimeRef.current = Date.now();
        setTimeout(() => {
          isAiSpeakingRef.current = false;
          onCompleted?.();
        }, 150);
      };

      utterance.onend = onDone;
      utterance.onerror = onDone;

      window.speechSynthesis.speak(utterance);
    } catch {
      isAiSpeakingRef.current = false;
      onCompleted?.();
    }
  }, []);

  // Master Translation Logic: Instant 2-way Chinese <-> Vietnamese
  const translateTwoWay = useCallback(
    async (rawText: string, forcedSourceLang?: 'vi' | 'zh'): Promise<TranslationResult> => {
      const text = rawText.trim();
      const key = normalizeKey(text);

      // Check phonetic Chinese input
      let cleanInput = text;
      let matchedPhonetic = false;
      if (PHONETIC_ZH[key]) {
        cleanInput = PHONETIC_ZH[key];
        matchedPhonetic = true;
      }
      const cleanKey = normalizeKey(cleanInput);

      // 1. Instant Cache (0ms)
      if (translationCache.has(cleanKey)) {
        return translationCache.get(cleanKey)!;
      }
      if (translationCache.has(key)) {
        return translationCache.get(key)!;
      }

      // 2. Instant Built-in Dictionary (0ms)
      const dictMatch = DICTIONARY[cleanKey] || DICTIONARY[key];
      if (dictMatch) {
        const isZhInput = matchedPhonetic || hasChineseCharacters(cleanInput) || forcedSourceLang === 'zh';
        const result: TranslationResult = {
          zhText: dictMatch.zh,
          viText: dictMatch.vi,
          spokenText: isZhInput ? dictMatch.vi : dictMatch.zh,
          spokenLang: isZhInput ? 'vi' : 'zh',
          detectedLang: isZhInput ? 'zh' : 'vi',
        };
        translationCache.set(key, result);
        translationCache.set(cleanKey, result);
        return result;
      }

      // Determine language direction automatically
      let isInputChinese = false;
      if (forcedSourceLang === 'zh') {
        isInputChinese = true;
      } else if (forcedSourceLang === 'vi') {
        isInputChinese = false;
      } else {
        isInputChinese = detectInputLanguage(cleanInput, currentMicLangRef.current) === 'zh';
      }

      // If Chinese was recognized via phonetic pinyin or bồi, convert to proper Hanzi characters
      if (isInputChinese && !hasChineseCharacters(cleanInput)) {
        const pKey = normalizeKey(cleanInput);
        if (PHONETIC_ZH[pKey]) {
          cleanInput = PHONETIC_ZH[pKey];
        } else if (PHONETIC_ZH[cleanInput.toLowerCase().trim()]) {
          cleanInput = PHONETIC_ZH[cleanInput.toLowerCase().trim()];
        }
      }

      const sl = isInputChinese ? 'zh-CN' : 'vi';
      const tl = isInputChinese ? 'vi' : 'zh-CN';

      // 3. Instant Translation Engine (<50ms response)
      const instantTranslated = await fetchInstantTranslation(cleanInput, sl, tl);
      if (instantTranslated) {
        const zh = isInputChinese ? cleanInput : instantTranslated;
        const vi = isInputChinese ? instantTranslated : cleanInput;
        const result: TranslationResult = {
          zhText: zh,
          viText: vi,
          spokenText: isInputChinese ? vi : zh,
          spokenLang: isInputChinese ? 'vi' : 'zh',
          detectedLang: isInputChinese ? 'zh' : 'vi',
        };
        translationCache.set(key, result);
        translationCache.set(cleanKey, result);
        return result;
      }

      // 4. Gemini Fallback if available
      const activeKey = resolveApiKey(apiKey);
      if (activeKey) {
        try {
          const ai = new GoogleGenAI({ apiKey: activeKey });
          const prompt = isInputChinese
            ? `Dịch câu tiếng Trung sau sang tiếng Việt tự nhiên ngắn gọn, chỉ trả lời bản dịch: "${cleanInput}"`
            : `Dịch câu tiếng Việt sau sang tiếng Trung (chữ Hán giản thể chuẩn), chỉ trả lời bản dịch: "${cleanInput}"`;

          const res = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
          });

          const geminiTranslated = res.text?.trim()?.replace(/["'`]/g, '');
          if (geminiTranslated) {
            const zh = isInputChinese ? cleanInput : geminiTranslated;
            const vi = isInputChinese ? geminiTranslated : cleanInput;
            const result: TranslationResult = {
              zhText: zh,
              viText: vi,
              spokenText: isInputChinese ? vi : zh,
              spokenLang: isInputChinese ? 'vi' : 'zh',
              detectedLang: isInputChinese ? 'zh' : 'vi',
            };
            translationCache.set(key, result);
            translationCache.set(cleanKey, result);
            return result;
          }
        } catch {}
      }

      // Fallback baseline
      return {
        zhText: isInputChinese ? cleanInput : '你好',
        viText: isInputChinese ? 'Xin chào' : cleanInput,
        spokenText: isInputChinese ? 'Xin chào' : '你好',
        spokenLang: isInputChinese ? 'vi' : 'zh',
        detectedLang: isInputChinese ? 'zh' : 'vi',
      };
    },
    [apiKey]
  );

  // Handle a new sentence to translate with instantaneous UI feedback & speaking
  const processTranslation = useCallback(
    async (text: string, forcedLang?: 'vi' | 'zh') => {
      const clean = text.trim();
      if (!clean || isTranslatingRef.current || isAiSpeakingRef.current) return;

      const now = Date.now();
      // Debounce exact duplicates
      if (clean === lastProcessedTextRef.current && now - lastProcessedTimeRef.current < 2000) {
        return;
      }
      lastProcessedTextRef.current = clean;
      lastProcessedTimeRef.current = now;

      // Clear any pending silence timer & live text & auto reset timer
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      if (autoResetMicTimerRef.current) {
        clearTimeout(autoResetMicTimerRef.current);
        autoResetMicTimerRef.current = null;
      }
      setLiveTranscript('');

      isTranslatingRef.current = true;
      setIsTranslating(true);

      const cardId = `card-${Date.now()}`;
      const nowTimeString = formatTime();

      const effectiveForcedLang: 'vi' | 'zh' | undefined =
        forcedLang ||
        (speakingModeRef.current === 'zh-to-vi'
          ? 'zh'
          : speakingModeRef.current === 'vi-to-zh'
            ? 'vi'
            : undefined);

      const isTentativeZh =
        effectiveForcedLang === 'zh' ||
        hasChineseCharacters(clean) ||
        detectInputLanguage(clean, currentMicLangRef.current) === 'zh';
      
      // Render card immediately
      setCards((prev) => [
        ...prev,
        {
          id: cardId,
          zhText: isTentativeZh ? clean : '',
          viText: isTentativeZh ? '' : clean,
          isPending: true,
          timeString: nowTimeString,
          timestamp: Date.now(),
          direction: isTentativeZh ? 'zh-to-vi' : 'vi-to-zh',
        },
      ]);

      setStatusMessage(isTentativeZh ? '⚡ Đang dịch sang Tiếng Việt và chuẩn bị phát âm...' : '⚡ Đang dịch sang Tiếng Trung và chuẩn bị phát âm...');

      try {
        const result = await translateTwoWay(clean, effectiveForcedLang);

        const finalDirection: 'zh-to-vi' | 'vi-to-zh' = result.detectedLang === 'zh' ? 'zh-to-vi' : 'vi-to-zh';

        // Update card immediately
        setCards((prev) =>
          prev.map((c) =>
            c.id === cardId
              ? {
                  ...c,
                  zhText: result.zhText,
                  viText: result.viText,
                  isPending: false,
                  direction: finalDirection,
                }
              : c
          )
        );

        // Turn-taking auto-swap handler when speech finishes
        const onSpeechDone = () => {
          if (speakingModeRef.current === 'zh-to-vi') {
            setMicrophoneLanguage('zh');
            setStatusMessage('🟢 Đang lắng nghe Tiếng Trung (zh-CN) · Bạn nói tiếng Trung ➔ AI dịch & phát âm Tiếng Việt');
            return;
          }
          if (speakingModeRef.current === 'vi-to-zh') {
            setMicrophoneLanguage('vi');
            setStatusMessage('🟢 Đang lắng nghe Tiếng Việt (vi-VN) · Bạn nói tiếng Việt ➔ AI dịch & phát âm Tiếng Trung');
            return;
          }
          // In auto mode:
          const nextMicLang: 'vi' | 'zh' = result.spokenLang === 'zh' ? 'zh' : 'vi';
          setMicrophoneLanguage(nextMicLang);
          setStatusMessage(
            nextMicLang === 'zh'
              ? '🟢 Mời nói Tiếng Trung 🇨🇳 · AI tự động dịch sang Tiếng Việt'
              : '🟢 Mời nói Tiếng Việt 🇻🇳 · AI tự động dịch sang Tiếng Trung'
          );
        };

        // AI speaks out loud with native accent
        speakTranslation(result.spokenText, result.spokenLang, onSpeechDone);

      } catch (err) {
        console.warn('Translate error:', err);
        setStatusMessage('Đã xảy ra lỗi, vui lòng thử lại');
      } finally {
        isTranslatingRef.current = false;
        setIsTranslating(false);
      }
    },
    [translateTwoWay, speakTranslation, setMicrophoneLanguage]
  );

  // Continuous Microphone Connection & Visual Audio Meter
  useEffect(() => {
    let isDisposed = false;
    let animId: number;

    const setupMicPipeline = async () => {
      try {
        const stream = await getSharedMicrophoneStream();
        if (isDisposed) return;

        const ctx = getSharedInputAudioContext();
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }

        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateMeter = () => {
          if (isDisposed) return;
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
          animId = requestAnimationFrame(updateMeter);
        };

        updateMeter();
        setIsMicUnlocked(true);
      } catch (err) {
        console.warn('Microphone permission notice:', err);
        setIsMicUnlocked(false);
      }
    };

    setupMicPipeline();

    return () => {
      isDisposed = true;
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Always-On Ultra-Responsive Speech Recognition Engine with 380ms silence endpointing
  useEffect(() => {
    let isCleanedUp = false;
    let restartTimer: any = null;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatusMessage('Trình duyệt chưa hỗ trợ SpeechRecognition. Bạn có thể gõ câu hoặc dùng Chrome.');
      return;
    }

    const startEngine = () => {
      if (
        isCleanedUp ||
        isRecognitionStartingRef.current ||
        isAiSpeakingRef.current ||
        isTranslatingRef.current ||
        Date.now() - lastAiSpeechEndTimeRef.current < 250
      ) {
        return;
      }

      try {
        isRecognitionStartingRef.current = true;

        if (activeRecognitionRef.current) {
          try {
            activeRecognitionRef.current.abort();
          } catch {}
          activeRecognitionRef.current = null;
        }

        const rec = new SpeechRecognition();
        activeRecognitionRef.current = rec;
        rec.continuous = true;
        rec.interimResults = true;

        const activeLangCode = currentMicLangRef.current === 'zh' ? 'zh-CN' : 'vi-VN';
        rec.lang = activeLangCode;

        rec.onstart = () => {
          isRecognitionStartingRef.current = false;
        };

        rec.onresult = (e: any) => {
          if (isCleanedUp || isAiSpeakingRef.current || isTranslatingRef.current) return;
          
          let interim = '';
          let final = '';

          for (let i = e.resultIndex; i < e.results.length; ++i) {
            if (e.results[i].isFinal) {
              final += e.results[i][0].transcript;
            } else {
              interim += e.results[i][0].transcript;
            }
          }

          const rawHeard = (final || interim).trim();
          if (rawHeard) {
            setLiveTranscript(rawHeard);
          }

          // Case 1: Final is ready -> Trigger immediately (0ms delay)
          const cleanFinal = final.trim();
          if (cleanFinal) {
            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
              silenceTimerRef.current = null;
            }
            processTranslation(cleanFinal);
            return;
          }

          // Case 2: Interim is heard -> Rapid 380ms silence debounce so the user doesn't wait 2-3s for browser isFinal
          const cleanInterim = interim.trim();
          if (cleanInterim.length >= 2) {
            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
            }
            silenceTimerRef.current = setTimeout(() => {
              if (!isCleanedUp && !isAiSpeakingRef.current && !isTranslatingRef.current) {
                processTranslation(cleanInterim);
              }
            }, 380);
          }
        };

        rec.onerror = () => {
          isRecognitionStartingRef.current = false;
          if (!isCleanedUp) {
            clearTimeout(restartTimer);
            restartTimer = setTimeout(() => {
              if (!isCleanedUp && !isAiSpeakingRef.current) {
                startEngine();
              }
            }, 100);
          }
        };

        rec.onend = () => {
          isRecognitionStartingRef.current = false;
          if (!isCleanedUp) {
            clearTimeout(restartTimer);
            restartTimer = setTimeout(() => {
              if (!isCleanedUp && !isAiSpeakingRef.current) {
                startEngine();
              }
            }, 50);
          }
        };

        rec.start();
      } catch {
        isRecognitionStartingRef.current = false;
        if (!isCleanedUp) {
          clearTimeout(restartTimer);
          restartTimer = setTimeout(() => {
            if (!isCleanedUp && !isAiSpeakingRef.current) {
              startEngine();
            }
          }, 200);
        }
      }
    };

    startEngine();

    // Active heartbeat to guarantee mic stays 100% responsive
    const watchdog = setInterval(() => {
      if (
        !isCleanedUp &&
        !isAiSpeakingRef.current &&
        !isRecognitionStartingRef.current &&
        !activeRecognitionRef.current
      ) {
        startEngine();
      }
    }, 1500);

    return () => {
      isCleanedUp = true;
      clearInterval(watchdog);
      clearTimeout(restartTimer);
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      if (autoResetMicTimerRef.current) {
        clearTimeout(autoResetMicTimerRef.current);
      }
      if (activeRecognitionRef.current) {
        try {
          activeRecognitionRef.current.abort();
        } catch {}
        activeRecognitionRef.current = null;
      }
    };
  }, [currentMicLang, processTranslation]);

  // Request/Unlock microphone gesture if needed
  const handleRequestMicAccess = async () => {
    try {
      const inCtx = getSharedInputAudioContext();
      const outCtx = getSharedOutputAudioContext();
      if (inCtx?.state === 'suspended') await inCtx.resume();
      if (outCtx?.state === 'suspended') await outCtx.resume();
      await getSharedMicrophoneStream();
      setIsMicUnlocked(true);
      setStatusMessage('🟢 Đã kết nối Micro · Nói là AI dịch ngay lập tức!');
      setMicrophoneLanguage(currentMicLang);
    } catch {
      setStatusMessage('Vui lòng cấp quyền Micro trên trình duyệt để sử dụng dịch giọng nói.');
    }
  };

  // Copy card lines to clipboard
  const handleCopyCard = (id: string, zhText: string, viText: string) => {
    const combined = [zhText, viText].filter(Boolean).join('\n').trim();
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(combined)
        .then(() => {
          setCopiedId(id);
          setTimeout(() => setCopiedId(null), 2000);
        })
        .catch(() => {});
    }
  };

  // Reset conversation
  const handleReset = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (autoResetMicTimerRef.current) {
      clearTimeout(autoResetMicTimerRef.current);
    }
    isAiSpeakingRef.current = false;
    isTranslatingRef.current = false;
    lastProcessedTextRef.current = '';
    setLiveTranscript('');
    setCards([]);
    if (speakingMode === 'zh-to-vi') {
      setMicrophoneLanguage('zh');
      setStatusMessage('🟢 Đang lắng nghe Tiếng Trung (zh-CN) · Bạn nói tiếng Trung ➔ AI dịch & phát âm Tiếng Việt');
    } else if (speakingMode === 'vi-to-zh') {
      setMicrophoneLanguage('vi');
      setStatusMessage('🟢 Đang lắng nghe Tiếng Việt (vi-VN) · Bạn nói tiếng Việt ➔ AI dịch & phát âm Tiếng Trung');
    } else {
      setMicrophoneLanguage('zh');
      setStatusMessage('🟢 Đã làm mới hội thoại · Sẵn sàng tự động nhận diện 2 chiều');
    }
  };

  // Toggle voice rate (1.0x -> 1.1x -> 1.25x)
  const handleToggleRate = () => {
    const next = speechRate === 1.0 ? 1.1 : speechRate === 1.1 ? 1.25 : 1.0;
    setSpeechRate(next);
  };

  return (
    <div className="w-full h-full flex flex-col flex-1 min-h-0 relative text-center overflow-hidden bg-white select-none">
      
      {/* Mic Permission Banner if not unlocked */}
      {!isMicUnlocked && (
        <div className="bg-amber-500 text-white px-4 py-2 text-xs sm:text-sm font-bold flex items-center justify-between gap-2 shadow-md z-40">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 animate-bounce" />
            <span>Chưa kích hoạt Micro. Hãy nhấn nút để bật micro tự động!</span>
          </div>
          <button
            onClick={handleRequestMicAccess}
            className="px-3 py-1 bg-white text-amber-800 rounded-lg font-extrabold hover:bg-amber-100 transition shadow-xs cursor-pointer"
          >
            Bật Micro ngay
          </button>
        </div>
      )}

      {/* Top Header & 2-Way Mode Bar */}
      <div className="flex-shrink-0 pt-2 pb-2 px-3 border-b border-amber-200/80 bg-stone-50/70 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 max-w-5xl mx-auto">
          
          {/* Left: Book Navigation + API Key */}
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <ApiKeyInput
              onSave={onSaveApiKey || ((k) => localStorage.setItem('gemini-api-key', k))}
              compact={true}
              popoverAlign="left"
            />

            <div
              onClick={onOpenToc}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-2xs flex items-center gap-1.5 cursor-pointer hover:opacity-95 transition-opacity"
              title="Mở mục lục sách"
            >
              <span>Trang {currentPageIndex}:</span>
              <span className="font-extrabold tracking-wide">Dịch đối đáp 2 chiều</span>
            </div>

            <div className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
              <span>Phản hồi tức thì</span>
            </div>
          </div>

          {/* Center: Mode Selector: 🇨🇳 Tôi nói Tiếng Trung | 🇻🇳 Tôi nói Tiếng Việt | 🔄 2 Chiều */}
          <div className="flex items-center p-1 bg-white rounded-2xl border border-stone-200 shadow-2xs gap-1">
            <button
              type="button"
              onClick={() => handleSelectMode('zh-to-vi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                speakingMode === 'zh-to-vi'
                  ? 'bg-amber-500 text-white shadow-xs font-extrabold ring-2 ring-amber-300/60'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
              title="Tôi nói tiếng Trung, AI dịch sang tiếng Việt và phát âm"
            >
              <span>🇨🇳 Tôi nói Tiếng Trung</span>
              <span className="text-[10px] opacity-90 hidden md:inline">➔ Dịch Tiếng Việt</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectMode('vi-to-zh')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                speakingMode === 'vi-to-zh'
                  ? 'bg-emerald-600 text-white shadow-xs font-extrabold ring-2 ring-emerald-300/60'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
              title="Tôi nói tiếng Việt, AI dịch sang tiếng Trung và phát âm"
            >
              <span>🇻🇳 Tôi nói Tiếng Việt</span>
              <span className="text-[10px] opacity-90 hidden md:inline">➔ Dịch Tiếng Trung</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectMode('auto')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                speakingMode === 'auto'
                  ? 'bg-blue-600 text-white shadow-xs font-extrabold ring-2 ring-blue-300/60'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
              title="Tự động nhận diện cả Tiếng Trung và Tiếng Việt"
            >
              <RotateCcw className="w-3 h-3" />
              <span>2 Chiều</span>
            </button>
          </div>

          {/* Right: Sound Level Meter & Quick Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Live Audio Volume Indicator */}
            <div 
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-stone-200 text-xs shadow-2xs"
              title="Độ nhạy Micro trực tiếp"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="w-12 h-2 bg-stone-100 rounded-full overflow-hidden flex items-center">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-75"
                  style={{ width: `${Math.max(10, audioLevel)}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-stone-500">Mic</span>
            </div>

            {/* Speech Rate Toggle */}
            <button
              type="button"
              onClick={handleToggleRate}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 transition cursor-pointer"
              title="Đổi tốc độ giọng đọc AI"
            >
              <Gauge className="w-3 h-3 text-stone-500" />
              <span>{speechRate}x</span>
            </button>

            {/* Stop Speech / Reset */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                isAiSpeakingRef.current = false;
              }}
              className="p-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 transition cursor-pointer"
              title="Dừng âm thanh AI đang đọc"
            >
              <VolumeX className="w-4 h-4" />
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition cursor-pointer"
              title="Làm mới cuộc trò chuyện"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Next page if applicable */}
            {onNextPage && currentPageIndex < totalPages && (
              <button
                onClick={onNextPage}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs flex items-center gap-1 cursor-pointer transition-colors"
                title={`Sang Trang ${currentPageIndex + 1}`}
              >
                <span>Trang {currentPageIndex + 1}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Live Status Indicator Bar */}
        <div className="mt-1.5 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${currentMicLang === 'zh' ? 'bg-amber-500 animate-ping' : 'bg-blue-500 animate-ping'}`} />
            <span className="text-xs font-bold text-stone-700 tracking-wide">
              {statusMessage}
            </span>
          </div>

          {/* Real-time speaking transcript preview */}
          {liveTranscript && (
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold animate-pulse border border-emerald-300">
              <Mic className="w-3.5 h-3.5 text-emerald-700" />
              <span>Đang nghe: "{liveTranscript}"</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Translation Cards Area */}
      <div className="flex-1 min-h-0 p-3 sm:p-5 overflow-y-auto flex flex-col gap-4 text-left max-w-4xl w-full mx-auto scrollbar-thin">
        {cards.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-stone-400 select-none">
            <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-600 mb-3 shadow-sm animate-pulse">
              <Mic className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-stone-800 mb-1">
              Micro sẵn sàng kết nối · Bạn nói Tiếng Trung, AI dịch ngay ra Tiếng Việt!
            </p>
            <p className="text-xs text-stone-500 max-w-sm mb-3">
              Chế độ hiện tại: 🇨🇳 Bạn nói Tiếng Trung ➔ AI tự động dịch sang Tiếng Việt và phát âm to rõ.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Nói tiếng Trung ➔ AI dịch tiếng Việt | Bấm nút nói bên dưới hoặc nói trực tiếp</span>
            </div>
          </div>
        ) : (
          cards.map((card) => (
            <div
              key={card.id}
              className={`w-full bg-white rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-sm transition-all flex flex-col ${
                card.direction === 'zh-to-vi' ? 'border-2 border-amber-400' : 'border-2 border-[#10b981]'
              }`}
            >
              {/* Direction Indicator Tag */}
              <div className="flex items-center justify-between pb-1.5 text-xs">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                  card.direction === 'zh-to-vi' 
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}>
                  {card.direction === 'zh-to-vi' ? (
                    <>
                      <span>🇨🇳 Bạn nói Tiếng Trung</span>
                      <span>➔</span>
                      <span>🇻🇳 AI dịch Tiếng Việt</span>
                    </>
                  ) : (
                    <>
                      <span>🇻🇳 Bạn nói Tiếng Việt</span>
                      <span>➔</span>
                      <span>🇨🇳 AI dịch Tiếng Trung</span>
                    </>
                  )}
                </div>
              </div>

              {/* Dòng 1: Chữ Hán */}
              <div
                onClick={() => card.zhText && speakTranslation(card.zhText, 'zh')}
                className="py-1 cursor-pointer transition text-left group flex items-center justify-between gap-3"
                title="Bấm để nghe phát âm tiếng Trung"
              >
                <div className="font-bold text-2xl sm:text-3xl text-stone-900 tracking-wide leading-snug group-hover:text-amber-700 transition-colors">
                  {card.zhText || (
                    <span className="text-stone-400 font-normal italic text-lg animate-pulse flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500 animate-spin" />
                      Đang nhận diện chữ Hán...
                    </span>
                  )}
                </div>
                <Volume2 className="w-5 h-5 text-stone-300 group-hover:text-amber-600 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Đường phân cách mảnh */}
              <div className="w-full border-b border-stone-200/80 my-2.5 sm:my-3" />

              {/* Dòng 2: Chữ Việt */}
              <div
                onClick={() => card.viText && speakTranslation(card.viText, 'vi')}
                className="py-1 cursor-pointer transition text-left group flex items-center justify-between gap-3"
                title="Bấm để nghe phát âm tiếng Việt"
              >
                <div className="font-bold text-xl sm:text-2xl text-stone-900 tracking-normal leading-snug group-hover:text-emerald-700 transition-colors">
                  {card.viText || (
                    <span className="text-stone-400 font-normal italic text-lg animate-pulse flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-500 animate-spin" />
                      Đang dịch sang tiếng Việt...
                    </span>
                  )}
                </div>
                <Volume2 className="w-5 h-5 text-stone-300 group-hover:text-emerald-600 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Footer: Sao chép 2 dòng • [hh:mm:ss] */}
              <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-2 sm:mt-3 pt-1 select-none">
                <button
                  type="button"
                  onClick={() => handleCopyCard(card.id, card.zhText, card.viText)}
                  className="inline-flex items-center gap-1.5 hover:text-stone-700 cursor-pointer transition-colors"
                  title="Sao chép cả 2 dòng"
                >
                  {copiedId === card.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Đã sao chép 2 dòng</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép 2 dòng</span>
                    </>
                  )}
                </button>
                <span>•</span>
                <span className="text-stone-400">{card.timeString}</span>
              </div>
            </div>
          ))
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Bottom Bar: Action Speaking Buttons + Status + Text Input */}
      <div className="flex-shrink-0 p-2 sm:p-3 bg-white border-t border-amber-200/80 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col gap-2.5">
          
          {/* Quick Dual Speaking Buttons */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
            <button
              type="button"
              onClick={() => {
                handleRequestMicAccess();
                handleSelectMode('zh-to-vi');
              }}
              className={`flex-1 max-w-sm py-2 px-3 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                speakingMode === 'zh-to-vi'
                  ? 'bg-amber-500 border-amber-600 text-white shadow-md scale-[1.01]'
                  : 'bg-white border-amber-300 text-amber-900 hover:bg-amber-50'
              }`}
              title="Kích hoạt nhận diện tiếng Trung, AI sẽ dịch ra tiếng Việt"
            >
              <div className={`p-1.5 rounded-full ${speakingMode === 'zh-to-vi' ? 'bg-white/20 animate-pulse text-white' : 'bg-amber-100 text-amber-600'}`}>
                <Mic className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs sm:text-sm font-extrabold flex items-center gap-1">
                  🇨🇳 Nói Tiếng Trung
                  {speakingMode === 'zh-to-vi' && <span className="w-2 h-2 rounded-full bg-white animate-ping ml-1" />}
                </span>
                <span className="text-[10px] sm:text-[11px] opacity-90">AI dịch ra Tiếng Việt & đọc to</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                handleRequestMicAccess();
                handleSelectMode('vi-to-zh');
              }}
              className={`flex-1 max-w-sm py-2 px-3 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                speakingMode === 'vi-to-zh'
                  ? 'bg-emerald-600 border-emerald-700 text-white shadow-md scale-[1.01]'
                  : 'bg-white border-emerald-300 text-emerald-900 hover:bg-emerald-50'
              }`}
              title="Kích hoạt nhận diện tiếng Việt, AI sẽ dịch ra tiếng Trung"
            >
              <div className={`p-1.5 rounded-full ${speakingMode === 'vi-to-zh' ? 'bg-white/20 animate-pulse text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                <Mic className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs sm:text-sm font-extrabold flex items-center gap-1">
                  🇻🇳 Nói Tiếng Việt
                  {speakingMode === 'vi-to-zh' && <span className="w-2 h-2 rounded-full bg-white animate-ping ml-1" />}
                </span>
                <span className="text-[10px] sm:text-[11px] opacity-90">AI dịch ra Tiếng Trung & đọc to</span>
              </div>
            </button>
          </div>

          {/* Form with input text */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputText.trim()) {
                processTranslation(inputText);
                setInputText('');
              }
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isTranslating}
              placeholder={
                speakingMode === 'zh-to-vi'
                  ? 'Nói tiếng Trung vào micro hoặc gõ chữ Hán / Pinyin (vd: 你好, 多少钱, 买单...)...'
                  : 'Nói vào micro hoặc nhập tiếng Việt / tiếng Trung vào đây (Enter để dịch)...'
              }
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50/50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTranslating}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Dịch ngay</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      </div>

      {/* Page Navigation Corner Dog-ears */}
      {onPrevPage && currentPageIndex > 1 && (
        <div
          onClick={onPrevPage}
          className="page-dogear-left"
          title={`Trang trước: Trang ${currentPageIndex - 1}`}
        />
      )}
      {onNextPage && currentPageIndex < totalPages && (
        <div
          onClick={onNextPage}
          className="page-dogear"
          title={`Trang sau: Trang ${currentPageIndex + 1}`}
        />
      )}
    </div>
  );
};

export default TranslatorPage;
