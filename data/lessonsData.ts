export interface DialogueStep {
  teacherQuestion: string;
  pinyinQuestion?: string;
  studentAnswer: string;
  pinyinAnswer?: string;
  vietnameseMeaning?: string;
}

export interface VocabularyItem {
  hanzi: string;
  pinyin: string;
  meaning: string;
}

export interface LessonSection {
  sectionNumber: number; // 1, 2, 3, 4
  title: string; // "Đoạn 1", "Đoạn 2", "Đoạn 3", "Đoạn 4"
  chineseSubtitle: string;
  pinyinSubtitle?: string;
  vietnameseSubtitle: string;
  dialogueHighlights: DialogueStep[];
  vocabulary?: VocabularyItem[];
  keyGrammar?: string;
}

export interface LessonData {
  lessonNumber: number; // 1 to 15
  internalLessonIndex: number;
  title: string;
  chineseTitle: string;
  pinyin: string;
  theme: string;
  summary: string;
  grammarPoints: string[];
  vocabulary: VocabularyItem[];
  dialogueHighlights: DialogueStep[];
  sections: LessonSection[];
}

export const LESSONS_DATA: LessonData[] = [
  {
    lessonNumber: 1,
    internalLessonIndex: 1,
    title: "Dịch câu",
    chineseTitle: "翻译句子",
    pinyin: "Fānyì jùzi",
    theme: "Luyện dịch 20 câu giao tiếp tiếng Việt sang tiếng Trung",
    summary: "Luyện dịch phản xạ 20 câu giao tiếp từ tiếng Việt sang tiếng Trung chuẩn giọng Bắc Kinh cùng giáo viên AI.",
    grammarPoints: [
      "Mẫu câu chào hỏi: 你好, 您好, 你们好, 老师好",
      "Mẫu câu lịch sự: 谢谢, 不客气, 对不起, 没关系",
      "Mẫu câu thỉnh cầu: 请进, 请坐, 请说, 请听, 请读, 请写, 再见"
    ],
    vocabulary: [
      { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "xin chào, chào bạn" },
      { hanzi: "您好", pinyin: "nín hǎo", meaning: "chào ngài, chào ông, chào bà" },
      { hanzi: "你们好", pinyin: "nǐmen hǎo", meaning: "chào mọi người, chào các bạn" },
      { hanzi: "老师好", pinyin: "lǎoshī hǎo", meaning: "chào thầy, chào cô giáo" },
      { hanzi: "谢谢", pinyin: "xièxie", meaning: "cảm ơn" },
      { hanzi: "不客气", pinyin: "bú kèqi", meaning: "không khách sáo" },
      { hanzi: "对不起", pinyin: "duìbuqǐ", meaning: "xin lỗi" },
      { hanzi: "没关系", pinyin: "méi guānxi", meaning: "không sao" },
      { hanzi: "请进", pinyin: "qǐng jìn", meaning: "mời vào" },
      { hanzi: "请坐", pinyin: "qǐng zuò", meaning: "mời ngồi" },
      { hanzi: "请说", pinyin: "qǐng shuō", meaning: "mời nói" },
      { hanzi: "请听", pinyin: "qǐng tīng", meaning: "mời nghe" },
      { hanzi: "请读", pinyin: "qǐng dú", meaning: "mời đọc" },
      { hanzi: "请写", pinyin: "qǐng xiě", meaning: "mời viết" },
      { hanzi: "再见", pinyin: "zàijiàn", meaning: "tạm biệt" }
    ],
    dialogueHighlights: [
      { teacherQuestion: "xin chào", studentAnswer: "你好", pinyinAnswer: "Nǐ hǎo", vietnameseMeaning: "xin chào" },
      { teacherQuestion: "chào bạn", studentAnswer: "你好", pinyinAnswer: "Nǐ hǎo", vietnameseMeaning: "chào bạn" },
      { teacherQuestion: "chào ngài", studentAnswer: "您好", pinyinAnswer: "Nín hǎo", vietnameseMeaning: "chào ngài" },
      { teacherQuestion: "chào ông", studentAnswer: "您好", pinyinAnswer: "Nín hǎo", vietnameseMeaning: "chào ông" },
      { teacherQuestion: "chào bà", studentAnswer: "您好", pinyinAnswer: "Nín hǎo", vietnameseMeaning: "chào bà" },
      { teacherQuestion: "chào mọi người", studentAnswer: "你们好", pinyinAnswer: "Nǐmen hǎo", vietnameseMeaning: "chào mọi người" },
      { teacherQuestion: "chào các bạn", studentAnswer: "你们好", pinyinAnswer: "Nǐmen hǎo", vietnameseMeaning: "chào các bạn" },
      { teacherQuestion: "chào thầy", studentAnswer: "老师好", pinyinAnswer: "Lǎoshī hǎo", vietnameseMeaning: "chào thầy" },
      { teacherQuestion: "chào cô giáo", studentAnswer: "老师好", pinyinAnswer: "Lǎoshī hǎo", vietnameseMeaning: "chào cô giáo" },
      { teacherQuestion: "cảm ơn", studentAnswer: "谢谢", pinyinAnswer: "Xièxie", vietnameseMeaning: "cảm ơn" },
      { teacherQuestion: "không khách sáo", studentAnswer: "不客气", pinyinAnswer: "Bú kèqi", vietnameseMeaning: "không khách sáo" },
      { teacherQuestion: "xin lỗi", studentAnswer: "对不起", pinyinAnswer: "Duìbuqǐ", vietnameseMeaning: "xin lỗi" },
      { teacherQuestion: "không sao", studentAnswer: "没关系", pinyinAnswer: "Méi guānxi", vietnameseMeaning: "không sao" },
      { teacherQuestion: "mời vào", studentAnswer: "请进", pinyinAnswer: "Qǐng jìn", vietnameseMeaning: "mời vào" },
      { teacherQuestion: "mời ngồi", studentAnswer: "请坐", pinyinAnswer: "Qǐng zuò", vietnameseMeaning: "mời ngồi" },
      { teacherQuestion: "mời nói", studentAnswer: "请说", pinyinAnswer: "Qǐng shuō", vietnameseMeaning: "mời nói" },
      { teacherQuestion: "mời nghe", studentAnswer: "请听", pinyinAnswer: "Qǐng tīng", vietnameseMeaning: "mời nghe" },
      { teacherQuestion: "mời đọc", studentAnswer: "请读", pinyinAnswer: "Qǐng dú", vietnameseMeaning: "mời đọc" },
      { teacherQuestion: "mời viết", studentAnswer: "请写", pinyinAnswer: "Qǐng xiě", vietnameseMeaning: "mời viết" },
      { teacherQuestion: "tạm biệt", studentAnswer: "再见", pinyinAnswer: "Zàijiàn", vietnameseMeaning: "tạm biệt" }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Dịch câu",
        chineseSubtitle: "翻译句子",
        pinyinSubtitle: "Fānyì jùzi",
        vietnameseSubtitle: "Luyện dịch 20 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt, học sinh dịch sang tiếng Trung chuẩn Bắc Kinh",
        vocabulary: [
          { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "xin chào, chào bạn" },
          { hanzi: "您好", pinyin: "nín hǎo", meaning: "chào ngài, chào ông, chào bà" },
          { hanzi: "谢谢", pinyin: "xièxie", meaning: "cảm ơn" },
          { hanzi: "再见", pinyin: "zàijiàn", meaning: "tạm biệt" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "xin chào",
            pinyinQuestion: "",
            studentAnswer: "你好",
            pinyinAnswer: "Nǐ hǎo",
            vietnameseMeaning: "xin chào"
          },
          {
            teacherQuestion: "chào bạn",
            pinyinQuestion: "",
            studentAnswer: "你好",
            pinyinAnswer: "Nǐ hǎo",
            vietnameseMeaning: "chào bạn"
          },
          {
            teacherQuestion: "chào ngài",
            pinyinQuestion: "",
            studentAnswer: "您好",
            pinyinAnswer: "Nín hǎo",
            vietnameseMeaning: "chào ngài"
          },
          {
            teacherQuestion: "chào ông",
            pinyinQuestion: "",
            studentAnswer: "您好",
            pinyinAnswer: "Nín hǎo",
            vietnameseMeaning: "chào ông"
          },
          {
            teacherQuestion: "chào bà",
            pinyinQuestion: "",
            studentAnswer: "您好",
            pinyinAnswer: "Nín hǎo",
            vietnameseMeaning: "chào bà"
          },
          {
            teacherQuestion: "chào mọi người",
            pinyinQuestion: "",
            studentAnswer: "你们好",
            pinyinAnswer: "Nǐmen hǎo",
            vietnameseMeaning: "chào mọi người"
          },
          {
            teacherQuestion: "chào các bạn",
            pinyinQuestion: "",
            studentAnswer: "你们好",
            pinyinAnswer: "Nǐmen hǎo",
            vietnameseMeaning: "chào các bạn"
          },
          {
            teacherQuestion: "chào thầy",
            pinyinQuestion: "",
            studentAnswer: "老师好",
            pinyinAnswer: "Lǎoshī hǎo",
            vietnameseMeaning: "chào thầy"
          },
          {
            teacherQuestion: "chào cô giáo",
            pinyinQuestion: "",
            studentAnswer: "老师好",
            pinyinAnswer: "Lǎoshī hǎo",
            vietnameseMeaning: "chào cô giáo"
          },
          {
            teacherQuestion: "cảm ơn",
            pinyinQuestion: "",
            studentAnswer: "谢谢",
            pinyinAnswer: "Xièxie",
            vietnameseMeaning: "cảm ơn"
          },
          {
            teacherQuestion: "không khách sáo",
            pinyinQuestion: "",
            studentAnswer: "不客气",
            pinyinAnswer: "Bú kèqi",
            vietnameseMeaning: "không khách sáo"
          },
          {
            teacherQuestion: "xin lỗi",
            pinyinQuestion: "",
            studentAnswer: "对不起",
            pinyinAnswer: "Duìbuqǐ",
            vietnameseMeaning: "xin lỗi"
          },
          {
            teacherQuestion: "không sao",
            pinyinQuestion: "",
            studentAnswer: "没关系",
            pinyinAnswer: "Méi guānxi",
            vietnameseMeaning: "không sao"
          },
          {
            teacherQuestion: "mời vào",
            pinyinQuestion: "",
            studentAnswer: "请进",
            pinyinAnswer: "Qǐng jìn",
            vietnameseMeaning: "mời vào"
          },
          {
            teacherQuestion: "mời ngồi",
            pinyinQuestion: "",
            studentAnswer: "请坐",
            pinyinAnswer: "Qǐng zuò",
            vietnameseMeaning: "mời ngồi"
          },
          {
            teacherQuestion: "mời nói",
            pinyinQuestion: "",
            studentAnswer: "请说",
            pinyinAnswer: "Qǐng shuō",
            vietnameseMeaning: "mời nói"
          },
          {
            teacherQuestion: "mời nghe",
            pinyinQuestion: "",
            studentAnswer: "请听",
            pinyinAnswer: "Qǐng tīng",
            vietnameseMeaning: "mời nghe"
          },
          {
            teacherQuestion: "mời đọc",
            pinyinQuestion: "",
            studentAnswer: "请读",
            pinyinAnswer: "Qǐng dú",
            vietnameseMeaning: "mời đọc"
          },
          {
            teacherQuestion: "mời viết",
            pinyinQuestion: "",
            studentAnswer: "请写",
            pinyinAnswer: "Qǐng xiě",
            vietnameseMeaning: "mời viết"
          },
          {
            teacherQuestion: "tạm biệt",
            pinyinQuestion: "",
            studentAnswer: "再见",
            pinyinAnswer: "Zàijiàn",
            vietnameseMeaning: "tạm biệt"
          }
        ]
      },
      {
        sectionNumber: 2,
        title: "Bài 1 Giao tiếp",
        chineseSubtitle: "双向问候与情境交际",
        pinyinSubtitle: "Shuāngxiàng wènhòu yǔ qíngjìng jiāojì",
        vietnameseSubtitle: "Luyện phản xạ hội thoại hai chiều",
        keyGrammar: "Giáo viên AI đóng vai trò người bản xứ Trung Quốc hỏi theo danh sách câu hỏi trong “ ”. Học sinh trả lời đúng ý nghĩa và đúng ngữ pháp là đạt yêu cầu. Khen “Tốt lắm” hoặc “Rất tốt”. Nếu sai sửa ngữ pháp, sửa phát âm chuẩn Bắc Kinh.",
        vocabulary: [
          { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "xin chào, chào bạn" },
          { hanzi: "您好", pinyin: "nín hǎo", meaning: "chào ngài, chào ông bà" },
          { hanzi: "你们好", pinyin: "nǐmen hǎo", meaning: "chào các bạn, chào mọi người" },
          { hanzi: "老师好", pinyin: "lǎoshī hǎo", meaning: "chào thầy, chào cô giáo" },
          { hanzi: "谢谢", pinyin: "xièxie", meaning: "cảm ơn" },
          { hanzi: "对不起", pinyin: "duìbuqǐ", meaning: "xin lỗi" },
          { hanzi: "再见", pinyin: "zàijiàn", meaning: "tạm biệt" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "你好？",
            pinyinQuestion: "Nǐ hǎo?",
            studentAnswer: "你好！",
            pinyinAnswer: "Nǐ hǎo!",
            vietnameseMeaning: "Xin chào / Chào bạn!"
          },
          {
            teacherQuestion: "您好？",
            pinyinQuestion: "Nín hǎo?",
            studentAnswer: "您好！",
            pinyinAnswer: "Nín hǎo!",
            vietnameseMeaning: "Chào ngài / Chào thầy cô ạ!"
          },
          {
            teacherQuestion: "你们好？",
            pinyinQuestion: "Nǐmen hǎo?",
            studentAnswer: "你好！ / 你们好！ / 老师好！",
            pinyinAnswer: "Nǐ hǎo! / Nǐmen hǎo! / Lǎoshī hǎo!",
            vietnameseMeaning: "Chào các bạn / Chào mọi người!"
          },
          {
            teacherQuestion: "老师好？",
            pinyinQuestion: "Lǎoshī hǎo?",
            studentAnswer: "老师好！ / 同学们好！ / 您好！",
            pinyinAnswer: "Lǎoshī hǎo! / Tóngxuémen hǎo! / Nín hǎo!",
            vietnameseMeaning: "Chào thầy cô / Chào các bạn!"
          },
          {
            teacherQuestion: "谢谢？",
            pinyinQuestion: "Xièxie?",
            studentAnswer: "不客气！ / 不用谢！ / 别客气！",
            pinyinAnswer: "Bú kèqi! / Búyòng xiè! / Bié kèqi!",
            vietnameseMeaning: "Không có gì / Đừng khách sáo!"
          },
          {
            teacherQuestion: "对不起？",
            pinyinQuestion: "Duìbuqǐ?",
            studentAnswer: "没关系！ / 没事！ / 不要紧！",
            pinyinAnswer: "Méi guānxi! / Méishì! / Búyàojǐn!",
            vietnameseMeaning: "Không sao đâu ạ!"
          },
          {
            teacherQuestion: "再见？",
            pinyinQuestion: "Zàijiàn?",
            studentAnswer: "再见！ / 明天见！ / 一会儿见！",
            pinyinAnswer: "Zàijiàn! / Míngtiān jiàn! / Yíhuìr jiàn!",
            vietnameseMeaning: "Tạm biệt! / Hẹn gặp lại!"
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Bài 2 Dịch câu",
        chineseSubtitle: "翻译句子",
        pinyinSubtitle: "Fānyì jùzi",
        vietnameseSubtitle: "Luyện dịch 29 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt, học sinh dịch sang tiếng Trung chuẩn Bắc Kinh",
        vocabulary: [
          { hanzi: "你好吗", pinyin: "nǐ hǎo ma", meaning: "bạn khỏe không" },
          { hanzi: "很好", pinyin: "hěn hǎo", meaning: "rất khỏe, rất tốt" },
          { hanzi: "也很好", pinyin: "yě hěn hǎo", meaning: "cũng rất khỏe" },
          { hanzi: "爸爸", pinyin: "bàba", meaning: "bố" },
          { hanzi: "妈妈", pinyin: "māma", meaning: "mẹ" },
          { hanzi: "哥哥", pinyin: "gēge", meaning: "anh trai" },
          { hanzi: "弟弟", pinyin: "dìdi", meaning: "em trai" },
          { hanzi: "妹妹", pinyin: "mèimei", meaning: "em gái" },
          { hanzi: "姐姐", pinyin: "jiějie", meaning: "chị gái" },
          { hanzi: "爱人", pinyin: "àiren", meaning: "vợ / chồng, người thương" },
          { hanzi: "忙", pinyin: "máng", meaning: "bận" },
          { hanzi: "累", pinyin: "lèi", meaning: "mệt" },
          { hanzi: "饿", pinyin: "è", meaning: "đói" },
          { hanzi: "渴", pinyin: "kě", meaning: "khát" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "Bạn khỏe không?",
            studentAnswer: "你好吗",
            pinyinAnswer: "Nǐ hǎo ma",
            vietnameseMeaning: "Bạn khỏe không?"
          },
          {
            teacherQuestion: "Tôi rất khỏe",
            studentAnswer: "我很好",
            pinyinAnswer: "Wǒ hěn hǎo",
            vietnameseMeaning: "Tôi rất khỏe"
          },
          {
            teacherQuestion: "Tôi cũng rất khỏe.",
            studentAnswer: "我也很好",
            pinyinAnswer: "Wǒ yě hěn hǎo",
            vietnameseMeaning: "Tôi cũng rất khỏe."
          },
          {
            teacherQuestion: "Bố mẹ bạn đều khỏe chứ?",
            studentAnswer: "你爸爸 妈妈都好吗",
            pinyinAnswer: "Nǐ bàba māma dōu hǎo ma",
            vietnameseMeaning: "Bố mẹ bạn đều khỏe chứ?"
          },
          {
            teacherQuestion: "Họ đều rất khỏe.",
            studentAnswer: "他们也都很好",
            pinyinAnswer: "Tāmen yě dōu hěn hǎo",
            vietnameseMeaning: "Họ đều rất khỏe."
          },
          {
            teacherQuestion: "Anh trai bạn khỏe không?",
            studentAnswer: "你哥哥好吗",
            pinyinAnswer: "Nǐ gēge hǎo ma",
            vietnameseMeaning: "Anh trai bạn khỏe không?"
          },
          {
            teacherQuestion: "Anh ấy rất khỏe",
            studentAnswer: "他很好",
            pinyinAnswer: "Tā hěn hǎo",
            vietnameseMeaning: "Anh ấy rất khỏe"
          },
          {
            teacherQuestion: "Anh trai tôi rất khỏe",
            studentAnswer: "我哥哥很好",
            pinyinAnswer: "Wǒ gēge hěn hǎo",
            vietnameseMeaning: "Anh trai tôi rất khỏe"
          },
          {
            teacherQuestion: "Em trai và em gái bạn khỏe không?",
            studentAnswer: "你弟弟 妹妹好吗",
            pinyinAnswer: "Nǐ dìdi mèimei hǎo ma",
            vietnameseMeaning: "Em trai và em gái bạn khỏe không?"
          },
          {
            teacherQuestion: "Họ đều rất khỏe.",
            studentAnswer: "他们也都很好",
            pinyinAnswer: "Tāmen yě dōu hěn hǎo",
            vietnameseMeaning: "Họ đều rất khỏe."
          },
          {
            teacherQuestion: "Chị gái bạn khỏe không?",
            studentAnswer: "你姐姐好吗",
            pinyinAnswer: "Nǐ jiějie hǎo ma",
            vietnameseMeaning: "Chị gái bạn khỏe không?"
          },
          {
            teacherQuestion: "Chị ấy rất khỏe?",
            studentAnswer: "她很好",
            pinyinAnswer: "Tā hěn hǎo",
            vietnameseMeaning: "Chị ấy rất khỏe?"
          },
          {
            teacherQuestion: "Tôi cũng rất khỏe.",
            studentAnswer: "我也很好",
            pinyinAnswer: "Wǒ yě hěn hǎo",
            vietnameseMeaning: "Tôi cũng rất khỏe."
          },
          {
            teacherQuestion: "Các em bạn đều khỏe chứ?",
            studentAnswer: "你弟弟妹妹都好吗",
            pinyinAnswer: "Nǐ dìdi mèimei dōu hǎo ma",
            vietnameseMeaning: "Các em bạn đều khỏe chứ?"
          },
          {
            teacherQuestion: "Họ đều rất khỏe.",
            studentAnswer: "他们也都很好",
            pinyinAnswer: "Tāmen yě dōu hěn hǎo",
            vietnameseMeaning: "Họ đều rất khỏe."
          },
          {
            teacherQuestion: "Vợ bạn khỏe không?",
            studentAnswer: "你爱人好吗",
            pinyinAnswer: "Nǐ àiren hǎo ma",
            vietnameseMeaning: "Vợ bạn khỏe không?"
          },
          {
            teacherQuestion: "Cô ấy rất khỏe?",
            studentAnswer: "她很好",
            pinyinAnswer: "Tā hěn hǎo",
            vietnameseMeaning: "Cô ấy rất khỏe?"
          },
          {
            teacherQuestion: "chồng bạn khỏe không?",
            studentAnswer: "你爱人好吗",
            pinyinAnswer: "Nǐ àiren hǎo ma",
            vietnameseMeaning: "chồng bạn khỏe không?"
          },
          {
            teacherQuestion: "anh ấy rất khỏe?",
            studentAnswer: "他很好",
            pinyinAnswer: "Tā hěn hǎo",
            vietnameseMeaning: "anh ấy rất khỏe?"
          },
          {
            teacherQuestion: "Tôi cũng rất khỏe.",
            studentAnswer: "我也很好",
            pinyinAnswer: "Wǒ yě hěn hǎo",
            vietnameseMeaning: "Tôi cũng rất khỏe."
          },
          {
            teacherQuestion: "Họ đều rất khỏe.",
            studentAnswer: "他们也都很好",
            pinyinAnswer: "Tāmen yě dōu hěn hǎo",
            vietnameseMeaning: "Họ đều rất khỏe."
          },
          {
            teacherQuestion: "Bạn có bận không?",
            studentAnswer: "你忙吗",
            pinyinAnswer: "Nǐ máng ma",
            vietnameseMeaning: "Bạn có bận không?"
          },
          {
            teacherQuestion: "Tôi không bận.",
            studentAnswer: "我不忙",
            pinyinAnswer: "Wǒ bù máng",
            vietnameseMeaning: "Tôi không bận."
          },
          {
            teacherQuestion: "Bạn có mệt không?",
            studentAnswer: "你累吗",
            pinyinAnswer: "Nǐ lèi ma",
            vietnameseMeaning: "Bạn có mệt không?"
          },
          {
            teacherQuestion: "Tôi không mệt.",
            studentAnswer: "我不累",
            pinyinAnswer: "Wǒ bú lèi",
            vietnameseMeaning: "Tôi không mệt."
          },
          {
            teacherQuestion: "Bạn có đói không?",
            studentAnswer: "你饿吗",
            pinyinAnswer: "Nǐ è ma",
            vietnameseMeaning: "Bạn có đói không?"
          },
          {
            teacherQuestion: "Tôi không đói.",
            studentAnswer: "我不饿",
            pinyinAnswer: "Wǒ bú è",
            vietnameseMeaning: "Tôi không đói."
          },
          {
            teacherQuestion: "Bạn có khát không?",
            studentAnswer: "你渴吗",
            pinyinAnswer: "Nǐ kě ma",
            vietnameseMeaning: "Bạn có khát không?"
          },
          {
            teacherQuestion: "Tôi rất khát.",
            studentAnswer: "我很渴",
            pinyinAnswer: "Wǒ hěn kě",
            vietnameseMeaning: "Tôi rất khát."
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Bài 2 Giao tiếp",
        chineseSubtitle: "双向问候与状态交际",
        pinyinSubtitle: "Shuāngxiàng wènhòu yǔ zhuàngtài jiāojì",
        vietnameseSubtitle: "Luyện phản xạ hội thoại hai chiều (11 câu)",
        keyGrammar: "Giáo viên AI đóng vai trò người bản xứ Trung Quốc hỏi các câu hỏi trong “ ”. Học sinh trả lời theo đúng ý nghĩa câu hỏi và đúng ngữ pháp là được. Nếu đúng thì khen “Tốt lắm” hoặc “Rất tốt”. Còn nếu sai giáo viên chỉ ra lỗi sai, sửa lỗi ngữ pháp, sửa phát âm. Giải thích bằng tiếng Việt. Khi sửa Giáo viên phát âm tiếng Trung chuẩn Bắc Kinh.",
        vocabulary: [
          { hanzi: "你好吗", pinyin: "nǐ hǎo ma", meaning: "bạn khỏe không" },
          { hanzi: "爸爸妈妈", pinyin: "bàba māma", meaning: "bố mẹ" },
          { hanzi: "哥哥", pinyin: "gēge", meaning: "anh trai" },
          { hanzi: "弟弟妹妹", pinyin: "dìdi mèimei", meaning: "em trai em gái" },
          { hanzi: "姐姐", pinyin: "jiějie", meaning: "chị gái" },
          { hanzi: "爱人", pinyin: "àiren", meaning: "vợ / chồng, người thương" },
          { hanzi: "忙", pinyin: "máng", meaning: "bận" },
          { hanzi: "累", pinyin: "lèi", meaning: "mệt" },
          { hanzi: "饿", pinyin: "è", meaning: "đói" },
          { hanzi: "渴", pinyin: "kě", meaning: "khát" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "你好吗？",
            pinyinQuestion: "Nǐ hǎo ma?",
            studentAnswer: "我很好！ / 我也很好！",
            pinyinAnswer: "Wǒ hěn hǎo! / Wǒ yě hěn hǎo!",
            vietnameseMeaning: "Bạn khỏe không? -> Tôi rất khỏe / Tôi cũng rất khỏe."
          },
          {
            teacherQuestion: "你爸爸妈妈都好吗？",
            pinyinQuestion: "Nǐ bàba māma dōu hǎo ma?",
            studentAnswer: "他们都很好！ / 他们也都很好！",
            pinyinAnswer: "Tāmen dōu hěn hǎo! / Tāmen yě dōu hěn hǎo!",
            vietnameseMeaning: "Bố mẹ bạn đều khỏe chứ? -> Họ đều rất khỏe."
          },
          {
            teacherQuestion: "你哥哥好吗？",
            pinyinQuestion: "Nǐ gēge hǎo ma?",
            studentAnswer: "他很好！ / 我哥哥很好！",
            pinyinAnswer: "Tā hěn hǎo! / Wǒ gēge hěn hǎo!",
            vietnameseMeaning: "Anh trai bạn khỏe không? -> Anh ấy rất khỏe."
          },
          {
            teacherQuestion: "你弟弟妹妹好吗？",
            pinyinQuestion: "Nǐ dìdi mèimei hǎo ma?",
            studentAnswer: "他们都很好！ / 他很好！ / 她很好！",
            pinyinAnswer: "Tāmen dōu hěn hǎo! / Tā hěn hǎo! / Tā hěn hǎo!",
            vietnameseMeaning: "Em trai và em gái bạn khỏe không? -> Họ đều khỏe."
          },
          {
            teacherQuestion: "你姐姐好吗？",
            pinyinQuestion: "Nǐ jiějie hǎo ma?",
            studentAnswer: "她很好！ / 我姐姐很好！",
            pinyinAnswer: "Tā hěn hǎo! / Wǒ jiějie hěn hǎo!",
            vietnameseMeaning: "Chị gái bạn khỏe không? -> Chị ấy rất khỏe."
          },
          {
            teacherQuestion: "你弟弟妹妹都好吗？",
            pinyinQuestion: "Nǐ dìdi mèimei dōu hǎo ma?",
            studentAnswer: "他们也都很好！ / 他们都很好！",
            pinyinAnswer: "Tāmen yě dōu hěn hǎo! / Tāmen dōu hěn hǎo!",
            vietnameseMeaning: "Các em bạn đều khỏe chứ? -> Họ đều rất khỏe."
          },
          {
            teacherQuestion: "你爱人好吗？",
            pinyinQuestion: "Nǐ àiren hǎo ma?",
            studentAnswer: "他很好！ / 她很好！ / 我爱人很好！",
            pinyinAnswer: "Tā hěn hǎo! / Tā hěn hǎo! / Wǒ àiren hěn hǎo!",
            vietnameseMeaning: "Người thương/vợ/chồng bạn khỏe không? -> Rất khỏe."
          },
          {
            teacherQuestion: "你忙吗？",
            pinyinQuestion: "Nǐ máng ma?",
            studentAnswer: "我不忙！ / 我很忙！",
            pinyinAnswer: "Wǒ bù máng! / Wǒ hěn máng!",
            vietnameseMeaning: "Bạn có bận không? -> Tôi không bận / Tôi rất bận."
          },
          {
            teacherQuestion: "你累吗？",
            pinyinQuestion: "Nǐ lèi ma?",
            studentAnswer: "我不累！ / 我很累！",
            pinyinAnswer: "Wǒ bú lèi! / Wǒ hěn lèi!",
            vietnameseMeaning: "Bạn có mệt không? -> Tôi không mệt / Tôi rất mệt."
          },
          {
            teacherQuestion: "你饿吗？",
            pinyinQuestion: "Nǐ è ma?",
            studentAnswer: "我不饿！ / 我很饿！",
            pinyinAnswer: "Wǒ bú è! / Wǒ hěn è!",
            vietnameseMeaning: "Bạn có đói không? -> Tôi không đói / Tôi rất đói."
          },
          {
            teacherQuestion: "你渴吗？",
            pinyinQuestion: "Nǐ kě ma?",
            studentAnswer: "我不渴！ / 我很渴！",
            pinyinAnswer: "Wǒ bù kě! / Wǒ hěn kě!",
            vietnameseMeaning: "Bạn có khát không? -> Tôi không khát / Tôi rất khát."
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 2,
    internalLessonIndex: 2,
    title: "Hội thoại Giao tiếp",
    chineseTitle: "逛商店与周末游览",
    pinyin: "Guàng shāngdiàn yǔ zhōumò yóulǎn",
    theme: "Mua sắm & Du lịch cuối tuần",
    summary: "Huấn luyện phản xạ đi mua sắm quần áo, kể về chuyến đi Vạn Lý Trường Thành, ăn vịt quay Bắc Kinh và thăm bạn bè bị ốm.",
    grammarPoints: [
      "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc có sự thay đổi.",
      "Lượng từ 件 (quần áo), 条 (váy, quần), 顶 (mũ), 只 (vịt).",
      "Cấu trúc 一... 就...: Hễ... là... / Vừa... là... (吃了早饭就去)."
    ],
    vocabulary: [
      { hanzi: "逛商店", pinyin: "guàng shāngdiàn", meaning: "dạo phố mua sắm" },
      { hanzi: "衬衣", pinyin: "chènyī", meaning: "áo sơ mi" },
      { hanzi: "裙子", pinyin: "qúnzi", meaning: "váy đầm" },
      { hanzi: "烤鸭", pinyin: "kǎoyā", meaning: "vịt quay" },
      { hanzi: "颐和园", pinyin: "Yíhéyuán", meaning: "Di Hòa Viên" },
      { hanzi: "抽时间", pinyin: "chōu shíjiān", meaning: "dành thời gian" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "刚才你去哪儿了？",
        pinyinQuestion: "Gāngcái nǐ qù nǎr le?",
        studentAnswer: "我跟直美逛商店去了。",
        pinyinAnswer: "Wǒ gēn Zhíměi guàng shāngdiàn qù le.",
        vietnameseMeaning: "Vừa nãy tôi cùng Naomi đi dạo phố mua sắm."
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Bài 3 Dịch câu",
        chineseSubtitle: "翻译句子",
        pinyinSubtitle: "Fānyì jùzi",
        vietnameseSubtitle: "Luyện dịch 30 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt phát âm chuẩn, học sinh dịch sang tiếng Trung chuẩn giọng Bắc Kinh",
        vocabulary: [
          { hanzi: "吃", pinyin: "chī", meaning: "ăn" },
          { hanzi: "什么", pinyin: "shénme", meaning: "cái gì" },
          { hanzi: "饺子", pinyin: "jiǎozi", meaning: "sủi cảo" },
          { hanzi: "米饭", pinyin: "mǐfàn", meaning: "cơm" },
          { hanzi: "面条", pinyin: "miàntiáo", meaning: "mì" },
          { hanzi: "面包", pinyin: "miànbāo", meaning: "bánh mì" },
          { hanzi: "包子", pinyin: "bāozi", meaning: "bánh bao" },
          { hanzi: "喝", pinyin: "hē", meaning: "uống" },
          { hanzi: "啤酒", pinyin: "píjiǔ", meaning: "bia" },
          { hanzi: "可口可乐", pinyin: "kěkǒukělè", meaning: "Coca-Cola" },
          { hanzi: "茶", pinyin: "chá", meaning: "trà" },
          { hanzi: "咖啡", pinyin: "kāfēi", meaning: "cà phê" },
          { hanzi: "矿泉水", pinyin: "kuàngquánshuǐ", meaning: "nước khoáng" },
          { hanzi: "牛奶", pinyin: "niúnǎi", meaning: "sữa" },
          { hanzi: "买", pinyin: "mǎi", meaning: "mua" },
          { hanzi: "词典", pinyin: "cídiǎn", meaning: "từ điển" },
          { hanzi: "本子", pinyin: "běnzi", meaning: "vở" },
          { hanzi: "书", pinyin: "shū", meaning: "sách" },
          { hanzi: "笔", pinyin: "bǐ", meaning: "bút" },
          { hanzi: "书包", pinyin: "shūbāo", meaning: "cặp sách" }
        ],
        dialogueHighlights: [
          { teacherQuestion: "Bạn ăn gì?", studentAnswer: "你吃什么？", pinyinAnswer: "Nǐ chī shénme?", vietnameseMeaning: "Bạn ăn gì?" },
          { teacherQuestion: "Tôi ăn sủi cảo.", studentAnswer: "我吃饺子。", pinyinAnswer: "Wǒ chī jiǎozi.", vietnameseMeaning: "Tôi ăn sủi cảo." },
          { teacherQuestion: "Bạn ăn gì?", studentAnswer: "你吃什么？", pinyinAnswer: "Nǐ chī shénme?", vietnameseMeaning: "Bạn ăn gì?" },
          { teacherQuestion: "Tôi ăn cơm.", studentAnswer: "我吃米饭。", pinyinAnswer: "Wǒ chī mǐfàn.", vietnameseMeaning: "Tôi ăn cơm." },
          { teacherQuestion: "Tôi ăn mì.", studentAnswer: "我吃面条。", pinyinAnswer: "Wǒ chī miàntiáo.", vietnameseMeaning: "Tôi ăn mì." },
          { teacherQuestion: "Bạn ăn gì?", studentAnswer: "你吃什么？", pinyinAnswer: "Nǐ chī shénme?", vietnameseMeaning: "Bạn ăn gì?" },
          { teacherQuestion: "Tôi ăn bánh mì.", studentAnswer: "我吃面包。", pinyinAnswer: "Wǒ chī miànbāo.", vietnameseMeaning: "Tôi ăn bánh mì." },
          { teacherQuestion: "Bạn ăn gì?", studentAnswer: "你吃什么？", pinyinAnswer: "Nǐ chī shénme?", vietnameseMeaning: "Bạn ăn gì?" },
          { teacherQuestion: "Tôi ăn bánh bao.", studentAnswer: "我吃包子。", pinyinAnswer: "Wǒ chī bāozi.", vietnameseMeaning: "Tôi ăn bánh bao." },
          { teacherQuestion: "Bạn uống gì?", studentAnswer: "你喝什么？", pinyinAnswer: "Nǐ hē shénme?", vietnameseMeaning: "Bạn uống gì?" },
          { teacherQuestion: "Tôi uống bia.", studentAnswer: "我喝啤酒。", pinyinAnswer: "Wǒ hē píjiǔ.", vietnameseMeaning: "Tôi uống bia." },
          { teacherQuestion: "Bạn uống gì?", studentAnswer: "你喝什么？", pinyinAnswer: "Nǐ hē shénme?", vietnameseMeaning: "Bạn uống gì?" },
          { teacherQuestion: "Tôi uống Coca-Cola.", studentAnswer: "我喝可口可乐。", pinyinAnswer: "Wǒ hē kěkǒukělè.", vietnameseMeaning: "Tôi uống Coca-Cola." },
          { teacherQuestion: "Bạn uống gì?", studentAnswer: "你喝什么？", pinyinAnswer: "Nǐ hē shénme?", vietnameseMeaning: "Bạn uống gì?" },
          { teacherQuestion: "Tôi uống trà.", studentAnswer: "我喝茶。", pinyinAnswer: "Wǒ hē chá.", vietnameseMeaning: "Tôi uống trà." },
          { teacherQuestion: "Tôi uống cà phê.", studentAnswer: "我喝咖啡。", pinyinAnswer: "Wǒ hē kāfēi.", vietnameseMeaning: "Tôi uống cà phê." },
          { teacherQuestion: "Bạn uống gì?", studentAnswer: "你喝什么？", pinyinAnswer: "Nǐ hē shénme?", vietnameseMeaning: "Bạn uống gì?" },
          { teacherQuestion: "Tôi uống nước khoáng.", studentAnswer: "我喝矿泉水。", pinyinAnswer: "Wǒ hē kuàngquánshuǐ.", vietnameseMeaning: "Tôi uống nước khoáng." },
          { teacherQuestion: "Bạn uống gì?", studentAnswer: "你喝什么？", pinyinAnswer: "Nǐ hē shénme?", vietnameseMeaning: "Bạn uống gì?" },
          { teacherQuestion: "Tôi uống sữa.", studentAnswer: "我喝牛奶。", pinyinAnswer: "Wǒ hē niúnǎi.", vietnameseMeaning: "Tôi uống sữa." },
          { teacherQuestion: "Bạn mua gì?", studentAnswer: "你买什么？", pinyinAnswer: "Nǐ mǎi shénme?", vietnameseMeaning: "Bạn mua gì?" },
          { teacherQuestion: "Tôi mua từ điển.", studentAnswer: "我买词典。", pinyinAnswer: "Wǒ mǎi cídiǎn.", vietnameseMeaning: "Tôi mua từ điển." },
          { teacherQuestion: "Bạn mua gì?", studentAnswer: "你买什么？", pinyinAnswer: "Nǐ mǎi shénme?", vietnameseMeaning: "Bạn mua gì?" },
          { teacherQuestion: "Tôi mua vở.", studentAnswer: "我买本子。", pinyinAnswer: "Wǒ mǎi běnzi.", vietnameseMeaning: "Tôi mua vở." },
          { teacherQuestion: "Bạn mua gì?", studentAnswer: "你买什么？", pinyinAnswer: "Nǐ mǎi shénme?", vietnameseMeaning: "Bạn mua gì?" },
          { teacherQuestion: "Tôi mua sách.", studentAnswer: "我买书。", pinyinAnswer: "Wǒ mǎi shū.", vietnameseMeaning: "Tôi mua sách." },
          { teacherQuestion: "Bạn mua gì?", studentAnswer: "你买什么？", pinyinAnswer: "Nǐ mǎi shénme?", vietnameseMeaning: "Bạn mua gì?" },
          { teacherQuestion: "Tôi mua bút.", studentAnswer: "我买笔。", pinyinAnswer: "Wǒ mǎi bǐ.", vietnameseMeaning: "Tôi mua bút." },
          { teacherQuestion: "Bạn mua gì?", studentAnswer: "你买什么？", pinyinAnswer: "Nǐ mǎi shénme?", vietnameseMeaning: "Bạn mua gì?" },
          { teacherQuestion: "Tôi mua cặp sách.", studentAnswer: "我买书包。", pinyinAnswer: "Wǒ mǎi shūbāo.", vietnameseMeaning: "Tôi mua cặp sách." }
        ]
      },
      {
        sectionNumber: 2,
        title: "Bài 3 Giao tiếp",
        chineseSubtitle: "饮食与购物实战交际",
        pinyinSubtitle: "Yǐnshí yǔ gòuwù shízhàn jiāojì",
        vietnameseSubtitle: "Luyện phản xạ hội thoại hai chiều (14 câu)",
        keyGrammar: "Giáo viên AI đóng vai trò người bản xứ Trung Quốc hỏi theo danh sách câu hỏi trong “ ”. Học sinh trả lời đúng ý nghĩa và đúng ngữ pháp là được. Nếu đúng thì khen “Tốt lắm” hoặc “Rất tốt”. Còn nếu sai giáo viên chỉ ra lỗi sai, sửa lỗi ngữ pháp, sửa phát âm chuẩn Bắc Kinh bằng tiếng Việt.",
        vocabulary: [
          { hanzi: "吃", pinyin: "chī", meaning: "ăn" },
          { hanzi: "什么", pinyin: "shénme", meaning: "cái gì" },
          { hanzi: "面条", pinyin: "miàntiáo", meaning: "mì sợi" },
          { hanzi: "饺子", pinyin: "jiǎozi", meaning: "sủi cảo" },
          { hanzi: "米饭", pinyin: "mǐfàn", meaning: "cơm" },
          { hanzi: "面包", pinyin: "miànbāo", meaning: "bánh mì" },
          { hanzi: "包子", pinyin: "bāozi", meaning: "bánh bao" },
          { hanzi: "喝", pinyin: "hē", meaning: "uống" },
          { hanzi: "啤酒", pinyin: "píjiǔ", meaning: "bia" },
          { hanzi: "可口可乐", pinyin: "kěkǒukělè", meaning: "Coca-Cola" },
          { hanzi: "茶", pinyin: "chá", meaning: "trà" },
          { hanzi: "咖啡", pinyin: "kāfēi", meaning: "cà phê" },
          { hanzi: "矿泉水", pinyin: "kuàngquánshuǐ", meaning: "nước khoáng" },
          { hanzi: "牛奶", pinyin: "niúnǎi", meaning: "sữa" },
          { hanzi: "买", pinyin: "mǎi", meaning: "mua" },
          { hanzi: "词典", pinyin: "cídiǎn", meaning: "từ điển" },
          { hanzi: "本子", pinyin: "běnzi", meaning: "vở" },
          { hanzi: "书", pinyin: "shū", meaning: "sách" },
          { hanzi: "笔", pinyin: "bǐ", meaning: "bút" },
          { hanzi: "书包", pinyin: "shūbāo", meaning: "cặp sách" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "你吃什么？",
            pinyinQuestion: "Nǐ chī shénme?",
            studentAnswer: "我吃面条 / 我吃饺子 / 我吃米饭 / 我吃包子 / 我吃面包",
            pinyinAnswer: "Wǒ chī miàntiáo / Wǒ chī jiǎozi...",
            vietnameseMeaning: "Bạn ăn gì? -> Tôi ăn mì / Tôi ăn sủi cảo / Tôi ăn cơm..."
          },
          {
            teacherQuestion: "你吃什么？",
            pinyinQuestion: "Nǐ chī shénme?",
            studentAnswer: "我吃饺子 / 我吃米饭 / 我吃面包",
            pinyinAnswer: "Wǒ chī jiǎozi / Wǒ chī mǐfàn...",
            vietnameseMeaning: "Bạn ăn gì? -> Tôi ăn sủi cảo / bánh mì..."
          },
          {
            teacherQuestion: "你吃什么？",
            pinyinQuestion: "Nǐ chī shénme?",
            studentAnswer: "我吃米饭 / 我吃面条 / 我吃包子",
            pinyinAnswer: "Wǒ chī mǐfàn / Wǒ chī miàntiáo...",
            vietnameseMeaning: "Bạn ăn gì? -> Tôi ăn cơm / mì..."
          },
          {
            teacherQuestion: "你吃什么？",
            pinyinQuestion: "Nǐ chī shénme?",
            studentAnswer: "我吃包子 / 我吃面包 / 我吃饺子",
            pinyinAnswer: "Wǒ chī bāozi / Wǒ chī miànbāo...",
            vietnameseMeaning: "Bạn ăn gì? -> Tôi ăn bánh bao / bánh mì..."
          },
          {
            teacherQuestion: "你喝什么？",
            pinyinQuestion: "Nǐ hē shénme?",
            studentAnswer: "我喝啤酒 / 我喝茶 / 我喝咖啡 / 我喝牛奶 / 我喝可口可乐",
            pinyinAnswer: "Wǒ hē píjiǔ / Wǒ hē chá...",
            vietnameseMeaning: "Bạn uống gì? -> Tôi uống bia / trà / cà phê..."
          },
          {
            teacherQuestion: "你喝什么？",
            pinyinQuestion: "Nǐ hē shénme?",
            studentAnswer: "我喝可口可乐 / 我喝矿泉水 / 我喝茶",
            pinyinAnswer: "Wǒ hē kěkǒukělè / Wǒ hē kuàngquánshuǐ...",
            vietnameseMeaning: "Bạn uống gì? -> Tôi uống Coca-Cola / nước khoáng..."
          },
          {
            teacherQuestion: "你喝什么？",
            pinyinQuestion: "Nǐ hē shénme?",
            studentAnswer: "我喝茶 / 我喝咖啡 / 我喝牛奶",
            pinyinAnswer: "Wǒ hē chá / Wǒ hē kāfēi...",
            vietnameseMeaning: "Bạn uống gì? -> Tôi uống trà / cà phê..."
          },
          {
            teacherQuestion: "你喝什么？",
            pinyinQuestion: "Nǐ hē shénme?",
            studentAnswer: "我喝咖啡 / 我喝牛奶 / 我喝水",
            pinyinAnswer: "Wǒ hē kāfēi / Wǒ hē niúnǎi...",
            vietnameseMeaning: "Bạn uống gì? -> Tôi uống cà phê / sữa..."
          },
          {
            teacherQuestion: "你喝什么？",
            pinyinQuestion: "Nǐ hē shénme?",
            studentAnswer: "我喝矿泉水 / 我喝牛奶 / 我喝啤酒",
            pinyinAnswer: "Wǒ hē kuàngquánshuǐ / Wǒ hē niúnǎi...",
            vietnameseMeaning: "Bạn uống gì? -> Tôi uống nước khoáng / sữa..."
          },
          {
            teacherQuestion: "你买什么？",
            pinyinQuestion: "Nǐ mǎi shénme?",
            studentAnswer: "我买词典 / 我买本子 / 我买书 / 我买笔 / 我买书包",
            pinyinAnswer: "Wǒ mǎi cídiǎn / Wǒ mǎi běnzi...",
            vietnameseMeaning: "Bạn mua gì? -> Tôi mua từ điển / vở / sách / bút..."
          },
          {
            teacherQuestion: "你买什么？",
            pinyinQuestion: "Nǐ mǎi shénme?",
            studentAnswer: "我买本子 / 我买笔 / 我买词典",
            pinyinAnswer: "Wǒ mǎi běnzi / Wǒ mǎi bǐ...",
            vietnameseMeaning: "Bạn mua gì? -> Tôi mua vở / bút..."
          },
          {
            teacherQuestion: "你买什么？",
            pinyinQuestion: "Nǐ mǎi shénme?",
            studentAnswer: "我买书 / 我买书包 / 我买本子",
            pinyinAnswer: "Wǒ mǎi shū / Wǒ mǎi shūbāo...",
            vietnameseMeaning: "Bạn mua gì? -> Tôi mua sách / cặp sách..."
          },
          {
            teacherQuestion: "你买什么？",
            pinyinQuestion: "Nǐ mǎi shénme?",
            studentAnswer: "我买笔 / 我买本子 / 我买书",
            pinyinAnswer: "Wǒ mǎi bǐ / Wǒ mǎi běnzi...",
            vietnameseMeaning: "Bạn mua gì? -> Tôi mua bút / vở..."
          },
          {
            teacherQuestion: "你买什么？",
            pinyinQuestion: "Nǐ mǎi shénme?",
            studentAnswer: "我买书包 / 我买词典 / 我买书",
            pinyinAnswer: "Wǒ mǎi shūbāo / Wǒ mǎi cídiǎn...",
            vietnameseMeaning: "Bạn mua gì? -> Tôi mua cặp sách / từ điển..."
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Bài 4 Dịch câu",
        chineseSubtitle: "换钱与问价翻译",
        pinyinSubtitle: "Huànqián yǔ wènjià fānyì",
        vietnameseSubtitle: "Luyện dịch 18 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt phát âm chuẩn, học sinh dịch sang tiếng Trung chuẩn giọng Bắc Kinh",
        vocabulary: [
          { hanzi: "换", pinyin: "huàn", meaning: "đổi (tiền)" },
          { hanzi: "钱", pinyin: "qián", meaning: "tiền" },
          { hanzi: "美元", pinyin: "měiyuán", meaning: "đô la Mỹ" },
          { hanzi: "多少", pinyin: "duōshao", meaning: "bao nhiêu" },
          { hanzi: "百", pinyin: "bǎi", meaning: "trăm" },
          { hanzi: "两", pinyin: "liǎng", meaning: "hai (lượng từ)" },
          { hanzi: "杯", pinyin: "bēi", meaning: "ly, cốc, tách" },
          { hanzi: "咖啡", pinyin: "kāfēi", meaning: "cà phê" },
          { hanzi: "块", pinyin: "kuài", meaning: "đồng (tệ)" },
          { hanzi: "本子", pinyin: "běnzi", meaning: "vở" },
          { hanzi: "毛", pinyin: "máo", meaning: "hào (tiền tệ)" },
          { hanzi: "瓶", pinyin: "píng", meaning: "chai, bình" },
          { hanzi: "啤酒", pinyin: "píjiǔ", meaning: "bia" },
          { hanzi: "面包", pinyin: "miànbāo", meaning: "bánh mì" },
          { hanzi: "本", pinyin: "běn", meaning: "quyển (sách)" },
          { hanzi: "词典", pinyin: "cídiǎn", meaning: "từ điển" },
          { hanzi: "九十", pinyin: "jiǔshí", meaning: "chín mươi" }
        ],
        dialogueHighlights: [
          { teacherQuestion: "Tôi muốn đổi tiền.", studentAnswer: "我要换钱", pinyinAnswer: "Wǒ yào huàn qián", vietnameseMeaning: "Tôi muốn đổi tiền." },
          { teacherQuestion: "Đổi loại tiền gì?", studentAnswer: "换什么钱", pinyinAnswer: "Huàn shénme qián", vietnameseMeaning: "Đổi loại tiền gì?" },
          { teacherQuestion: "Đổi đô la Mỹ.", studentAnswer: "换美元", pinyinAnswer: "Huàn měiyuán", vietnameseMeaning: "Đổi đô la Mỹ." },
          { teacherQuestion: "Đổi bao nhiêu tiền?", studentAnswer: "换多少钱", pinyinAnswer: "Huàn duōshao qián", vietnameseMeaning: "Đổi bao nhiêu tiền?" },
          { teacherQuestion: "Đổi 100 đô la Mỹ.", studentAnswer: "换一百美元", pinyinAnswer: "Huàn yì bǎi měiyuán", vietnameseMeaning: "Đổi 100 đô la Mỹ." },
          { teacherQuestion: "Đổi 200 đô la Mỹ.", studentAnswer: "换二百美元", pinyinAnswer: "Huàn èr bǎi měiyuán", vietnameseMeaning: "Đổi 200 đô la Mỹ." },
          { teacherQuestion: "Đổi 300 đô la Mỹ.", studentAnswer: "换三百美元", pinyinAnswer: "Huàn sān bǎi měiyuán", vietnameseMeaning: "Đổi 300 đô la Mỹ." },
          { teacherQuestion: "Đổi 400 đô la Mỹ.", studentAnswer: "换四百美元", pinyinAnswer: "Huàn sì bǎi měiyuán", vietnameseMeaning: "Đổi 400 đô la Mỹ." },
          { teacherQuestion: "Hai tách cà phê giá bao nhiêu tiền?", studentAnswer: "两杯咖啡多少钱", pinyinAnswer: "Liǎng bēi kāfēi duōshao qián", vietnameseMeaning: "Hai tách cà phê giá bao nhiêu tiền?" },
          { teacherQuestion: "Năm đồng.", studentAnswer: "五块", pinyinAnswer: "Wǔ kuài", vietnameseMeaning: "Năm đồng." },
          { teacherQuestion: "Một quyển vở giá bao nhiêu tiền?", studentAnswer: "一个本子多少钱", pinyinAnswer: "Yí gè běnzi duōshao qián", vietnameseMeaning: "Một quyển vở giá bao nhiêu tiền?" },
          { teacherQuestion: "Sáu hào.", studentAnswer: "六毛", pinyinAnswer: "Liù máo", vietnameseMeaning: "Sáu hào." },
          { teacherQuestion: "Bốn chai bia giá bao nhiêu tiền?", studentAnswer: "四瓶啤酒多少钱", pinyinAnswer: "Sì píng píjiǔ duōshao qián", vietnameseMeaning: "Bốn chai bia giá bao nhiêu tiền?" },
          { teacherQuestion: "Bảy đồng hai hào.", studentAnswer: "七块二", pinyinAnswer: "Qī kuài èr", vietnameseMeaning: "Bảy đồng hai hào." },
          { teacherQuestion: "Hai ổ bánh mì giá bao nhiêu tiền?", studentAnswer: "两个面包多少钱", pinyinAnswer: "Liǎng gè miànbāo duōshao qián", vietnameseMeaning: "Hai ổ bánh mì giá bao nhiêu tiền?" },
          { teacherQuestion: "Tám đồng.", studentAnswer: "八块", pinyinAnswer: "Bā kuài", vietnameseMeaning: "Tám đồng." },
          { teacherQuestion: "Ba quyển từ điển giá bao nhiêu tiền?", studentAnswer: "三本词典多少钱", pinyinAnswer: "Sān běn cídiǎn duōshao qián", vietnameseMeaning: "Ba quyển từ điển giá bao nhiêu tiền?" },
          { teacherQuestion: "Chín mươi đồng.", studentAnswer: "九十块", pinyinAnswer: "Jiǔshí kuài", vietnameseMeaning: "Chín mươi đồng." }
        ]
      },
      {
        sectionNumber: 4,
        title: "Bài 4 Giao tiếp",
        chineseSubtitle: "换钱与购物问价交际",
        pinyinSubtitle: "Huànqián yǔ gòuwù wènjià jiāojì",
        vietnameseSubtitle: "Luyện phản xạ hội thoại hai chiều (8 câu)",
        keyGrammar: "Giáo viên AI đóng vai trò người bản xứ Trung Quốc hỏi theo danh sách câu hỏi trong “ ”. Học sinh trả lời đúng ý nghĩa câu hỏi và đúng ngữ pháp là được. Nếu đúng thì khen “Tốt lắm” hoặc “Rất tốt” bằng tiếng Việt. Còn nếu sai giáo viên chỉ ra lỗi sai, sửa lỗi ngữ pháp, sửa phát âm chuẩn Bắc Kinh bằng tiếng Việt.",
        vocabulary: [
          { hanzi: "换钱", pinyin: "huànqián", meaning: "đổi tiền" },
          { hanzi: "美元", pinyin: "měiyuán", meaning: "đô la Mỹ" },
          { hanzi: "多少钱", pinyin: "duōshao qián", meaning: "bao nhiêu tiền" },
          { hanzi: "咖啡", pinyin: "kāfēi", meaning: "cà phê" },
          { hanzi: "本子", pinyin: "běnzi", meaning: "vở" },
          { hanzi: "啤酒", pinyin: "píjiǔ", meaning: "bia" },
          { hanzi: "面包", pinyin: "miànbāo", meaning: "bánh mì" },
          { hanzi: "词典", pinyin: "cídiǎn", meaning: "từ điển" },
          { hanzi: "块", pinyin: "kuài", meaning: "đồng (tệ)" },
          { hanzi: "毛", pinyin: "máo", meaning: "hào" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "你要换钱吗。",
            pinyinQuestion: "Nǐ yào huàn qián ma.",
            studentAnswer: "我要换钱 / 我想换钱 / 换 / 不换",
            pinyinAnswer: "Wǒ yào huàn qián...",
            vietnameseMeaning: "Bạn muốn đổi tiền không? -> Tôi muốn đổi tiền..."
          },
          {
            teacherQuestion: "换什么钱？",
            pinyinQuestion: "Huàn shénme qián?",
            studentAnswer: "换美元 / 换人民币 / 换越南盾",
            pinyinAnswer: "Huàn měiyuán...",
            vietnameseMeaning: "Đổi loại tiền gì? -> Đổi đô la Mỹ..."
          },
          {
            teacherQuestion: "换多少钱？",
            pinyinQuestion: "Huàn duōshao qián?",
            studentAnswer: "换一百美元 / 换二百美元 / 换三百美元",
            pinyinAnswer: "Huàn yì bǎi měiyuán...",
            vietnameseMeaning: "Đổi bao nhiêu tiền? -> Đổi 100 đô la Mỹ..."
          },
          {
            teacherQuestion: "两杯咖啡多少钱？",
            pinyinQuestion: "Liǎng bēi kāfēi duōshao qián?",
            studentAnswer: "五块 / 十块 / 两杯咖啡五块",
            pinyinAnswer: "Wǔ kuài...",
            vietnameseMeaning: "Hai tách cà phê bao nhiêu tiền? -> 5 đồng..."
          },
          {
            teacherQuestion: "一个本子多少钱？",
            pinyinQuestion: "Yí gè běnzi duōshao qián?",
            studentAnswer: "六毛 / 一块 / 一个本子六毛",
            pinyinAnswer: "Liù máo...",
            vietnameseMeaning: "Một quyển vở bao nhiêu tiền? -> 6 hào..."
          },
          {
            teacherQuestion: "四瓶啤酒多少钱？",
            pinyinQuestion: "Sì píng píjiǔ duōshao qián?",
            studentAnswer: "七块二 / 八块 / 十块",
            pinyinAnswer: "Qī kuài èr...",
            vietnameseMeaning: "Bốn chai bia bao nhiêu tiền? -> 7 đồng 2 hào..."
          },
          {
            teacherQuestion: "两个面包多少钱？",
            pinyinQuestion: "Liǎng gè miànbāo duōshao qián?",
            studentAnswer: "八块 / 五块 / 十块",
            pinyinAnswer: "Bā kuài...",
            vietnameseMeaning: "Hai ổ bánh mì bao nhiêu tiền? -> 8 đồng..."
          },
          {
            teacherQuestion: "三本词典多少钱？",
            pinyinQuestion: "Sān běn cídiǎn duōshao qián?",
            studentAnswer: "九十块 / 一百块 / 八十块",
            pinyinAnswer: "Jiǔshí kuài...",
            vietnameseMeaning: "Ba quyển từ điển bao nhiêu tiền? -> 90 đồng..."
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 3,
    internalLessonIndex: 3,
    title: "Mùa thu rồi",
    chineseTitle: "秋天了与四季气候",
    pinyin: "Qiūtiān le yǔ sìjì qìhòu",
    theme: "Thời tiết & Bốn mùa",
    summary: "Luyện diễn đạt sự thay đổi trạng thái theo thời gian, thời tiết mùa thu lá đỏ Hương Sơn và sự bận rộn khi đi làm.",
    grammarPoints: [
      "了 biểu thị sự biến chuyển trạng thái mới: 天气凉了 (Trời đã trở lạnh rồi).",
      "Cấu trúc 快要... 了 / 要... 了: Sắp... rồi (要下课了, 要回国了).",
      "Phó từ 有点儿 + Tính từ: Hơi... một chút (有点儿瘦了)."
    ],
    vocabulary: [
      { hanzi: "季节", pinyin: "jìjié", meaning: "mùa" },
      { hanzi: "树叶", pinyin: "shùyè", meaning: "lá cây" },
      { hanzi: "红叶", pinyin: "hóngyè", meaning: "lá đỏ" },
      { hanzi: "睡懒觉", pinyin: "shuì lǎnjiào", meaning: "ngủ nướng" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "现在是什么季节了？",
        pinyinQuestion: "Xiànzài shì shénme jìjié le?",
        studentAnswer: "秋天了。",
        pinyinAnswer: "Qiūtiān le.",
        vietnameseMeaning: "Mùa thu rồi."
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Bài 5 Dịch câu",
        chineseSubtitle: "问路与处所翻译",
        pinyinSubtitle: "Wènlù yǔ chùsuǒ fānyì",
        vietnameseSubtitle: "Luyện dịch 28 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt phát âm chuẩn, học sinh dịch sang tiếng Trung chuẩn giọng Bắc Kinh",
        vocabulary: [
          { hanzi: "请问", pinyin: "qǐngwèn", meaning: "xin hỏi" },
          { hanzi: "图书馆", pinyin: "túshūguǎn", meaning: "thư viện" },
          { hanzi: "在哪儿", pinyin: "zài nǎr", meaning: "ở đâu" },
          { hanzi: "就在那儿", pinyin: "jiù zài nàr", meaning: "ở ngay đằng kia / chỗ đó" },
          { hanzi: "食堂", pinyin: "shítáng", meaning: "nhà ăn" },
          { hanzi: "留学生宿舍", pinyin: "liúxuéshēng sùshè", meaning: "ký túc xá lưu học sinh" },
          { hanzi: "办公室", pinyin: "bàngōngshì", meaning: "văn phòng" },
          { hanzi: "七楼", pinyin: "qī lóu", meaning: "tầng bảy" },
          { hanzi: "邮局", pinyin: "yóujú", meaning: "bưu điện" },
          { hanzi: "对不起", pinyin: "duìbuqǐ", meaning: "xin lỗi" },
          { hanzi: "我不知道", pinyin: "wǒ bù zhīdào", meaning: "tôi không biết" },
          { hanzi: "银行", pinyin: "yínháng", meaning: "ngân hàng" },
          { hanzi: "医院", pinyin: "yīyuàn", meaning: "bệnh viện" },
          { hanzi: "商店", pinyin: "shāngdiàn", meaning: "cửa hàng" },
          { hanzi: "书店", pinyin: "shūdiàn", meaning: "hiệu sách" },
          { hanzi: "去哪儿", pinyin: "qù nǎr", meaning: "đi đâu" },
          { hanzi: "天安门", pinyin: "Tiān'ānmén", meaning: "Thiên An Môn" },
          { hanzi: "故宫", pinyin: "Gùgōng", meaning: "Cố Cung" },
          { hanzi: "颐和园", pinyin: "Yíhéyuán", meaning: "Di Hòa Viên" },
          { hanzi: "长城", pinyin: "Chángchéng", meaning: "Trường Thành (Vạn Lý Trường Thành)" }
        ],
        dialogueHighlights: [
          { teacherQuestion: "Xin hỏi, thư viện ở đâu?", studentAnswer: "请问.图书馆在哪儿", pinyinAnswer: "Qǐngwèn. Túshūguǎn zài nǎr", vietnameseMeaning: "Xin hỏi, thư viện ở đâu?" },
          { teacherQuestion: "Ở ngay đằng kia.", studentAnswer: "就在那儿", pinyinAnswer: "Jiù zài nàr", vietnameseMeaning: "Ở ngay đằng kia." },
          { teacherQuestion: "Xin hỏi, nhà ăn ở đâu?", studentAnswer: "请问.食堂在哪儿", pinyinAnswer: "Qǐngwèn. Shítáng zài nǎr", vietnameseMeaning: "Xin hỏi, nhà ăn ở đâu?" },
          { teacherQuestion: "Ở ngay chỗ đó.", studentAnswer: "就在哪儿", pinyinAnswer: "Jiù zài nǎr", vietnameseMeaning: "Ở ngay chỗ đó." },
          { teacherQuestion: "Xin hỏi, ký túc xá lưu học sinh ở đâu?", studentAnswer: "请问.留学生宿舍在哪儿", pinyinAnswer: "Qǐngwèn. Liúxuéshēng sùshè zài nǎr", vietnameseMeaning: "Xin hỏi, ký túc xá lưu học sinh ở đâu?" },
          { teacherQuestion: "Ở ngay chỗ đó.", studentAnswer: "就在哪儿", pinyinAnswer: "Jiù zài nǎr", vietnameseMeaning: "Ở ngay chỗ đó." },
          { teacherQuestion: "Xin hỏi, văn phòng ở đâu?", studentAnswer: "请问.办公室在哪儿", pinyinAnswer: "Qǐngwèn. Bàngōngshì zài nǎr", vietnameseMeaning: "Xin hỏi, văn phòng ở đâu?" },
          { teacherQuestion: "Ở ngay chỗ đó.", studentAnswer: "就在哪儿", pinyinAnswer: "Jiù zài nǎr", vietnameseMeaning: "Ở ngay chỗ đó." },
          { teacherQuestion: "Xin hỏi, tầng bảy ở đâu?", studentAnswer: "请问.七楼在哪儿", pinyinAnswer: "Qǐngwèn. Qī lóu zài nǎr", vietnameseMeaning: "Xin hỏi, tầng bảy ở đâu?" },
          { teacherQuestion: "Ở ngay chỗ đó.", studentAnswer: "就在哪儿", pinyinAnswer: "Jiù zài nǎr", vietnameseMeaning: "Ở ngay chỗ đó." },
          { teacherQuestion: "Xin hỏi, bưu điện ở đâu?", studentAnswer: "请问.邮局在哪儿", pinyinAnswer: "Qǐngwèn. Yóujú zài nǎr", vietnameseMeaning: "Xin hỏi, bưu điện ở đâu?" },
          { teacherQuestion: "Xin lỗi, tôi không biết.", studentAnswer: "对不起.我不知道", pinyinAnswer: "Duìbuqǐ. Wǒ bù zhīdào", vietnameseMeaning: "Xin lỗi, tôi không biết." },
          { teacherQuestion: "Xin hỏi, ngân hàng ở đâu?", studentAnswer: "请问.银行在哪儿", pinyinAnswer: "Qǐngwèn. Yínháng zài nǎr", vietnameseMeaning: "Xin hỏi, ngân hàng ở đâu?" },
          { teacherQuestion: "Xin lỗi, tôi không biết.", studentAnswer: "对不起.我不知道", pinyinAnswer: "Duìbuqǐ. Wǒ bù zhīdào", vietnameseMeaning: "Xin lỗi, tôi không biết." },
          { teacherQuestion: "Xin hỏi, bệnh viện ở đâu?", studentAnswer: "请问.医院在哪儿", pinyinAnswer: "Qǐngwèn. Yīyuàn zài nǎr", vietnameseMeaning: "Xin hỏi, bệnh viện ở đâu?" },
          { teacherQuestion: "Xin lỗi, tôi không biết.", studentAnswer: "对不起.我不知道", pinyinAnswer: "Duìbuqǐ. Wǒ bù zhīdào", vietnameseMeaning: "Xin lỗi, tôi không biết." },
          { teacherQuestion: "Xin hỏi, cửa hàng ở đâu?", studentAnswer: "请问.商店在哪儿", pinyinAnswer: "Qǐngwèn. Shāngdiàn zài nǎr", vietnameseMeaning: "Xin hỏi, cửa hàng ở đâu?" },
          { teacherQuestion: "Xin lỗi, tôi không biết.", studentAnswer: "对不起.我不知道", pinyinAnswer: "Duìbuqǐ. Wǒ bù zhīdào", vietnameseMeaning: "Xin lỗi, tôi không biết." },
          { teacherQuestion: "Xin hỏi, hiệu sách ở đâu?", studentAnswer: "请问.书店在哪儿", pinyinAnswer: "Qǐngwèn. Shūdiàn zài nǎr", vietnameseMeaning: "Xin hỏi, hiệu sách ở đâu?" },
          { teacherQuestion: "Xin lỗi, tôi không biết.", studentAnswer: "对不起.我不知道", pinyinAnswer: "Duìbuqǐ. Wǒ bù zhīdào", vietnameseMeaning: "Xin lỗi, tôi không biết." },
          { teacherQuestion: "Bạn đi đâu?", studentAnswer: "你去哪儿", pinyinAnswer: "Nǐ qù nǎr", vietnameseMeaning: "Bạn đi đâu?" },
          { teacherQuestion: "Tôi đi Thiên An Môn.", studentAnswer: "我去天安门", pinyinAnswer: "Wǒ qù Tiān'ānmén", vietnameseMeaning: "Tôi đi Thiên An Môn." },
          { teacherQuestion: "Bạn đi đâu?", studentAnswer: "你去哪儿", pinyinAnswer: "Nǐ qù nǎr", vietnameseMeaning: "Bạn đi đâu?" },
          { teacherQuestion: "Tôi đi Cố Cung.", studentAnswer: "我去故宫", pinyinAnswer: "Wǒ qù Gùgōng", vietnameseMeaning: "Tôi đi Cố Cung." },
          { teacherQuestion: "Bạn đi đâu?", studentAnswer: "你去哪儿", pinyinAnswer: "Nǐ qù nǎr", vietnameseMeaning: "Bạn đi đâu?" },
          { teacherQuestion: "Tôi đi Di Hòa Viên.", studentAnswer: "我去颐和园", pinyinAnswer: "Wǒ qù Yíhéyuán", vietnameseMeaning: "Tôi đi Di Hòa Viên." },
          { teacherQuestion: "Bạn đi đâu?", studentAnswer: "你去哪儿", pinyinAnswer: "Nǐ qù nǎr", vietnameseMeaning: "Bạn đi đâu?" },
          { teacherQuestion: "Tôi đi Vạn Lý Trường Thành.", studentAnswer: "我去长城", pinyinAnswer: "Wǒ qù Chángchéng", vietnameseMeaning: "Tôi đi Vạn Lý Trường Thành." }
        ]
      },
      {
        sectionNumber: 2,
        title: "Bài 5 Giao tiếp",
        chineseSubtitle: "问路与去向交际",
        pinyinSubtitle: "Wènlù yǔ qùxiàng jiāojì",
        vietnameseSubtitle: "Luyện phản xạ giao tiếp 14 câu hai chiều",
        keyGrammar: "请问...在哪儿？ / 就在那儿 / 你去哪儿？ / 我去...",
        dialogueHighlights: [
          {
            teacherQuestion: "请问，图书馆在哪儿？",
            pinyinQuestion: "Qǐngwèn, túshūguǎn zài nǎr?",
            studentAnswer: "就在那儿 / 对不起，我不知道。",
            pinyinAnswer: "Jiù zài nàr / Duìbuqǐ, wǒ bù zhīdào.",
            vietnameseMeaning: "Ở ngay đằng kia / Xin lỗi, tôi không biết."
          },
          {
            teacherQuestion: "请问，食堂在哪儿？",
            pinyinQuestion: "Qǐngwèn, shítáng zài nǎr?",
            studentAnswer: "就在那儿。",
            pinyinAnswer: "Jiù zài nàr.",
            vietnameseMeaning: "Ở ngay chỗ đó."
          },
          {
            teacherQuestion: "请问，留学生宿舍在哪儿？",
            pinyinQuestion: "Qǐngwèn, liúxuéshēng sùshè zài nǎr?",
            studentAnswer: "就在那儿。",
            pinyinAnswer: "Jiù zài nàr.",
            vietnameseMeaning: "Ở ngay đằng kia."
          },
          {
            teacherQuestion: "请问，办公室在哪儿？",
            pinyinQuestion: "Qǐngwèn, bàngōngshì zài nǎr?",
            studentAnswer: "就在那儿。",
            pinyinAnswer: "Jiù zài nàr.",
            vietnameseMeaning: "Ở ngay chỗ đó."
          },
          {
            teacherQuestion: "请问，七楼在哪儿？",
            pinyinQuestion: "Qǐngwèn, qī lóu zài nǎr?",
            studentAnswer: "就在那儿。",
            pinyinAnswer: "Jiù zài nàr.",
            vietnameseMeaning: "Ở ngay trên kia."
          },
          {
            teacherQuestion: "请问，邮局在哪儿？",
            pinyinQuestion: "Qǐngwèn, yóujú zài nǎr?",
            studentAnswer: "对不起，我不知道。",
            pinyinAnswer: "Duìbuqǐ, wǒ bù zhīdào.",
            vietnameseMeaning: "Xin lỗi, tôi không biết."
          },
          {
            teacherQuestion: "请问，银行在哪儿？",
            pinyinQuestion: "Qǐngwèn, yínháng zài nǎr?",
            studentAnswer: "对不起，我不知道。",
            pinyinAnswer: "Duìbuqǐ, wǒ bù zhīdào.",
            vietnameseMeaning: "Xin lỗi, tôi không biết."
          },
          {
            teacherQuestion: "请问，医院在哪儿？",
            pinyinQuestion: "Qǐngwèn, yīyuàn zài nǎr?",
            studentAnswer: "对不起，我不知道。",
            pinyinAnswer: "Duìbuqǐ, wǒ bù zhīdào.",
            vietnameseMeaning: "Xin lỗi, tôi không biết."
          },
          {
            teacherQuestion: "请问，商店在哪儿？",
            pinyinQuestion: "Qǐngwèn, shāngdiàn zài nǎr?",
            studentAnswer: "对不起，我不知道。",
            pinyinAnswer: "Duìbuqǐ, wǒ bù zhīdào.",
            vietnameseMeaning: "Xin lỗi, tôi không biết."
          },
          {
            teacherQuestion: "请问，书店在哪儿？",
            pinyinQuestion: "Qǐngwèn, shūdiàn zài nǎr?",
            studentAnswer: "对不起，我不知道。",
            pinyinAnswer: "Duìbuqǐ, wǒ bù zhīdào.",
            vietnameseMeaning: "Xin lỗi, tôi không biết."
          },
          {
            teacherQuestion: "你去哪儿？",
            pinyinQuestion: "Nǐ qù nǎr?",
            studentAnswer: "我去天安门。",
            pinyinAnswer: "Wǒ qù Tiān'ānmén.",
            vietnameseMeaning: "Tôi đi Thiên An Môn."
          },
          {
            teacherQuestion: "你去哪儿？",
            pinyinQuestion: "Nǐ qù nǎr?",
            studentAnswer: "我去故宫。",
            pinyinAnswer: "Wǒ qù Gùgōng.",
            vietnameseMeaning: "Tôi đi Cố Cung."
          },
          {
            teacherQuestion: "你去哪儿？",
            pinyinQuestion: "Nǐ qù nǎr?",
            studentAnswer: "我去颐和园。",
            pinyinAnswer: "Wǒ qù Yíhéyuán.",
            vietnameseMeaning: "Tôi đi Di Hòa Viên."
          },
          {
            teacherQuestion: "你去哪儿？",
            pinyinQuestion: "Nǐ qù nǎr?",
            studentAnswer: "我去长城。",
            pinyinAnswer: "Wǒ qù Chángchéng.",
            vietnameseMeaning: "Tôi đi Vạn Lý Trường Thành."
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Bài 6 Dịch câu",
        chineseSubtitle: "家庭介绍与书籍国籍翻译",
        pinyinSubtitle: "Jiātíng jièshào yǔ shūjí guójí fānyì",
        vietnameseSubtitle: "Luyện dịch 27 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt phát âm chuẩn, học sinh dịch sang tiếng Trung chuẩn giọng Bắc Kinh",
        vocabulary: [
          { hanzi: "你们好", pinyin: "nǐmen hǎo", meaning: "chào các bạn" },
          { hanzi: "认识", pinyin: "rènshi", meaning: "quen biết, làm quen" },
          { hanzi: "介绍", pinyin: "jièshào", meaning: "giới thiệu" },
          { hanzi: "一下儿", pinyin: "yíxiàr", meaning: "một chút, một lát" },
          { hanzi: "爸爸", pinyin: "bàba", meaning: "bố" },
          { hanzi: "妈妈", pinyin: "māma", meaning: "mẹ" },
          { hanzi: "爱人", pinyin: "àiren", meaning: "vợ / chồng, người thương" },
          { hanzi: "漂亮极了", pinyin: "piàoliang jí le", meaning: "đẹp vô cùng" },
          { hanzi: "女儿", pinyin: "nǚ'ér", meaning: "con gái" },
          { hanzi: "聪明", pinyin: "cōngming", meaning: "thông minh" },
          { hanzi: "可爱", pinyin: "kě'ài", meaning: "đáng yêu" },
          { hanzi: "帅", pinyin: "shuài", meaning: "đẹp trai" },
          { hanzi: "什么", pinyin: "shénme", meaning: "cái gì" },
          { hanzi: "书", pinyin: "shū", meaning: "sách" },
          { hanzi: "汉语", pinyin: "Hànyǔ", meaning: "tiếng Trung" },
          { hanzi: "朋友", pinyin: "péngyou", meaning: "bạn bè" },
          { hanzi: "新", pinyin: "xīn", meaning: "mới" },
          { hanzi: "德国人", pinyin: "Déguórén", meaning: "người Đức" },
          { hanzi: "越南人", pinyin: "Yuènánrén", meaning: "người Việt Nam" },
          { hanzi: "学习", pinyin: "xuéxí", meaning: "học tập" },
          { hanzi: "姐姐", pinyin: "jiějie", meaning: "chị gái" }
        ],
        dialogueHighlights: [
          { teacherQuestion: "Xin chào các bạn!", studentAnswer: "你们好", pinyinAnswer: "Nǐmen hǎo", vietnameseMeaning: "Xin chào các bạn!" },
          { teacherQuestion: "Rất vui được làm quen với các bạn.", studentAnswer: "很高兴认识你们", pinyinAnswer: "Hěn gāoxìng rènshi nǐmen", vietnameseMeaning: "Rất vui được làm quen với các bạn." },
          { teacherQuestion: "Để tôi giới thiệu một chút.", studentAnswer: "我来介绍一下儿", pinyinAnswer: "Wǒ lái jièshào yíxiàr", vietnameseMeaning: "Để tôi giới thiệu một chút." },
          { teacherQuestion: "Đây là bố tôi.", studentAnswer: "这是我爸爸", pinyinAnswer: "Zhè shì wǒ bàba", vietnameseMeaning: "Đây là bố tôi." },
          { teacherQuestion: "Đây là mẹ tôi.", studentAnswer: "这是我妈妈", pinyinAnswer: "Zhè shì wǒ māma", vietnameseMeaning: "Đây là mẹ tôi." },
          { teacherQuestion: "Đây là vợ tôi.", studentAnswer: "这是我爱人", pinyinAnswer: "Zhè shì wǒ àiren", vietnameseMeaning: "Đây là vợ tôi." },
          { teacherQuestion: "Cô ấy đẹp vô cùng.", studentAnswer: "她漂亮极了", pinyinAnswer: "Tā piàoliang jí le", vietnameseMeaning: "Cô ấy đẹp vô cùng." },
          { teacherQuestion: "Đây là con gái của chúng tôi.", studentAnswer: "这是我们的女儿", pinyinAnswer: "Zhè shì wǒmen de nǚ'ér", vietnameseMeaning: "Đây là con gái của chúng tôi." },
          { teacherQuestion: "Cô bé rất thông minh, cũng rất đáng yêu.", studentAnswer: "她很聪明.也很可爱", pinyinAnswer: "Tā hěn cōngming, yě hěn kě'ài", vietnameseMeaning: "Cô bé rất thông minh, cũng rất đáng yêu." },
          { teacherQuestion: "Các bạn nhìn xem, đây là tôi, rất đẹp trai!", studentAnswer: "你们看.这是我.很帅", pinyinAnswer: "Nǐmen kàn, zhè shì wǒ, hěn shuài", vietnameseMeaning: "Các bạn nhìn xem, đây là tôi, rất đẹp trai!" },
          { teacherQuestion: "Đây là cái gì?", studentAnswer: "这是什么", pinyinAnswer: "Zhè shì shénme", vietnameseMeaning: "Đây là cái gì?" },
          { teacherQuestion: "Đây là sách.", studentAnswer: "这是书", pinyinAnswer: "Zhè shì shū", vietnameseMeaning: "Đây là sách." },
          { teacherQuestion: "Đây là sách gì?", studentAnswer: "这是什么书", pinyinAnswer: "Zhè shì shénme shū", vietnameseMeaning: "Đây là sách gì?" },
          { teacherQuestion: "Đây là sách tiếng Trung.", studentAnswer: "这是汉语书", pinyinAnswer: "Zhè shì Hànyǔ shū", vietnameseMeaning: "Đây là sách tiếng Trung." },
          { teacherQuestion: "Đây có phải là sách của bạn không?", studentAnswer: "这是你的书吗", pinyinAnswer: "Zhè shì nǐ de shū ma", vietnameseMeaning: "Đây có phải là sách của bạn không?" },
          { teacherQuestion: "Đây không phải là sách của tôi.", studentAnswer: "这不是我的书", pinyinAnswer: "Zhè bú shì wǒ de shū", vietnameseMeaning: "Đây không phải là sách của tôi." },
          { teacherQuestion: "Đây là sách của bạn tôi.", studentAnswer: "这是我朋友的书", pinyinAnswer: "Zhè shì wǒ péngyou de shū", vietnameseMeaning: "Đây là sách của bạn tôi." },
          { teacherQuestion: "Quyển sách này rất mới.", studentAnswer: "这本书很新", pinyinAnswer: "Zhè běn shū hěn xīn", vietnameseMeaning: "Quyển sách này rất mới." },
          { teacherQuestion: "Bạn có phải là người Đức không?", studentAnswer: "你是德国人吗", pinyinAnswer: "Nǐ shì Déguórén ma", vietnameseMeaning: "Bạn có phải là người Đức không?" },
          { teacherQuestion: "Tôi không phải là người Đức.", studentAnswer: "我不是德国人", pinyinAnswer: "Wǒ bú shì Déguórén", vietnameseMeaning: "Tôi không phải là người Đức." },
          { teacherQuestion: "Tôi là người Việt Nam.", studentAnswer: "我是越南人", pinyinAnswer: "Wǒ shì Yuènánrén", vietnameseMeaning: "Tôi là người Việt Nam." },
          { teacherQuestion: "Bạn học gì?", studentAnswer: "你学习什么", pinyinAnswer: "Nǐ xuéxí shénme", vietnameseMeaning: "Bạn học gì?" },
          { teacherQuestion: "Tôi học tiếng Trung.", studentAnswer: "我学习汉语", pinyinAnswer: "Wǒ xuéxí Hànyǔ", vietnameseMeaning: "Tôi học tiếng Trung." },
          { teacherQuestion: "Bạn học có tốt không?", studentAnswer: "你学习好吗", pinyinAnswer: "Nǐ xuéxí hǎo ma", vietnameseMeaning: "Bạn học có tốt không?" },
          { teacherQuestion: "Tôi học rất tốt.", studentAnswer: "我学习很好", pinyinAnswer: "Wǒ xuéxí hěn hǎo", vietnameseMeaning: "Tôi học rất tốt." },
          { teacherQuestion: "Cô ấy có phải là chị gái của bạn không?", studentAnswer: "她是你姐姐吗", pinyinAnswer: "Tā shì nǐ jiějie ma", vietnameseMeaning: "Cô ấy có phải là chị gái của bạn không?" },
          { teacherQuestion: "Cô ấy không phải là chị gái của tôi.", studentAnswer: "她不是我姐姐", pinyinAnswer: "Tā bú shì wǒ jiějie", vietnameseMeaning: "Cô ấy không phải là chị gái của tôi." }
        ]
      },
      {
        sectionNumber: 4,
        title: "Bài 6 Giao tiếp",
        chineseSubtitle: "问候与书籍国籍交际",
        pinyinSubtitle: "Wènhòu yǔ shūjí guójí jiāojì",
        vietnameseSubtitle: "Luyện phản xạ 9 câu giao tiếp hai chiều",
        keyGrammar: "Giáo viên AI đóng vai trò người bản xứ Trung Quốc hỏi theo danh sách 9 câu trong “ ”. Học sinh trả lời đúng ý nghĩa và đúng ngữ pháp là đạt yêu cầu. Khen “Tốt lắm” hoặc “Rất tốt”. Nếu sai sửa ngữ pháp, sửa phát âm chuẩn Bắc Kinh.",
        vocabulary: [
          { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "chào bạn" },
          { hanzi: "这是什么", pinyin: "zhè shì shénme", meaning: "đây là cái gì" },
          { hanzi: "这是什么书", pinyin: "zhè shì shénme shū", meaning: "đây là sách gì" },
          { hanzi: "你的书", pinyin: "nǐ de shū", meaning: "sách của bạn" },
          { hanzi: "新", pinyin: "xīn", meaning: "mới" },
          { hanzi: "德国人", pinyin: "Déguórén", meaning: "người Đức" },
          { hanzi: "学习", pinyin: "xuéxí", meaning: "học tập" },
          { hanzi: "姐姐", pinyin: "jiějie", meaning: "chị gái" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "你好？",
            pinyinQuestion: "Nǐ hǎo?",
            studentAnswer: "你好！ / 您好！ / 老师好！",
            pinyinAnswer: "Nǐ hǎo! / Nín hǎo! / Lǎoshī hǎo!",
            vietnameseMeaning: "Chào bạn? -> Chào bạn! / Chào thầy cô!"
          },
          {
            teacherQuestion: "这是什么？",
            pinyinQuestion: "Zhè shì shénme?",
            studentAnswer: "这是书 / 这是词典 / 这是本子 / 这是笔",
            pinyinAnswer: "Zhè shì shū...",
            vietnameseMeaning: "Đây là cái gì? -> Đây là sách / từ điển / vở..."
          },
          {
            teacherQuestion: "这是什么书？",
            pinyinQuestion: "Zhè shì shénme shū?",
            studentAnswer: "这是汉语书 / 这是英文书 / 这是中文书",
            pinyinAnswer: "Zhè shì Hànyǔ shū...",
            vietnameseMeaning: "Đây là sách gì? -> Đây là sách tiếng Trung / sách tiếng Anh..."
          },
          {
            teacherQuestion: "这是你的书吗？",
            pinyinQuestion: "Zhè shì nǐ de shū ma?",
            studentAnswer: "这不是我的书，这是我朋友的书 / 是我的书",
            pinyinAnswer: "Zhè bú shì wǒ de shū...",
            vietnameseMeaning: "Đây có phải là sách của bạn không? -> Không phải sách của tôi / Sách của bạn tôi..."
          },
          {
            teacherQuestion: "这本书很新吗？",
            pinyinQuestion: "Zhè běn shū hěn xīn ma?",
            studentAnswer: "这本书很新 / 这本书不新 / 不是很新",
            pinyinAnswer: "Zhè běn shū hěn xīn...",
            vietnameseMeaning: "Quyển sách này rất mới phải không? -> Quyển sách này rất mới / không mới..."
          },
          {
            teacherQuestion: "你是德国人吗？",
            pinyinQuestion: "Nǐ shì Déguórén ma?",
            studentAnswer: "我不是德国人，我是越南人 / 是，我是德国人",
            pinyinAnswer: "Wǒ bú shì Déguórén, wǒ shì Yuènánrén...",
            vietnameseMeaning: "Bạn có phải là người Đức không? -> Tôi không phải người Đức, tôi là người Việt Nam..."
          },
          {
            teacherQuestion: "你学习什么？",
            pinyinQuestion: "Nǐ xuéxí shénme?",
            studentAnswer: "我学习汉语 / 我学习中文 / 我学习英语",
            pinyinAnswer: "Wǒ xuéxí Hànyǔ...",
            vietnameseMeaning: "Bạn học gì? -> Tôi học tiếng Trung / học tiếng Anh..."
          },
          {
            teacherQuestion: "你学习好吗？",
            pinyinQuestion: "Nǐ xuéxí hǎo ma?",
            studentAnswer: "我学习很好 / 很好 / 还行 / 不太好",
            pinyinAnswer: "Wǒ xuéxí hěn hǎo...",
            vietnameseMeaning: "Bạn học có tốt không? -> Tôi học rất tốt / cũng được..."
          },
          {
            teacherQuestion: "她是你姐姐吗？",
            pinyinQuestion: "Tā shì nǐ jiějie ma?",
            studentAnswer: "她不是我姐姐 / 是，她是我姐姐 / 她是我妹妹",
            pinyinAnswer: "Tā bú shì wǒ jiějie...",
            vietnameseMeaning: "Cô ấy có phải là chị gái của bạn không? -> Cô ấy không phải chị gái tôi / là chị gái tôi..."
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 4,
    internalLessonIndex: 4,
    title: "Thể thao & Bóng đá",
    chineseTitle: "体育与足球比赛",
    pinyin: "Tǐyù yǔ zúqiú bǐsài",
    theme: "Sở thích thể thao & Trận đấu kịch tính",
    summary: "Thảo luận về khả năng bơi lội, trình độ đá bóng, xem truyền hình trực tiếp trận đấu kinh điển giữa Brazil và Đức.",
    grammarPoints: [
      "Bổ ngữ trạng thái: Động từ + 得 + Trình độ/Đánh giá (游得不错, 踢得真棒).",
      "Cụm từ đặc biệt: 旱鸭子 (người không biết bơi).",
      "Nói về phỏng đoán: 估计... 会... (Tôi dự đoán... sẽ...)."
    ],
    vocabulary: [
      { hanzi: "游泳", pinyin: "yóuyǒng", meaning: "bơi lội" },
      { hanzi: "踢足球", pinyin: "tī zúqiú", meaning: "đá bóng" },
      { hanzi: "球星", pinyin: "qiúxīng", meaning: "ngôi sao bóng đá" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "你会游泳吗？",
        pinyinQuestion: "Nǐ huì yóuyǒng ma?",
        studentAnswer: "我会游泳，能游八百米呢。",
        pinyinAnswer: "Wǒ huì yóuyǒng, néng yóu bābǎi mǐ ne.",
        vietnameseMeaning: "Tôi biết bơi, còn bơi được 800 mét đấy."
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Bài 7 Dịch câu",
        chineseSubtitle: "校园生活与问答翻译",
        pinyinSubtitle: "Xiàoyuán shēnghuó yǔ wèndá fānyì",
        vietnameseSubtitle: "Luyện dịch 20 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt phát âm chuẩn, học sinh dịch sang tiếng Trung chuẩn giọng Bắc Kinh",
        vocabulary: [
          { hanzi: "最近", pinyin: "zuìjìn", meaning: "gần đây" },
          { hanzi: "身体", pinyin: "shēntǐ", meaning: "sức khỏe, thân thể" },
          { hanzi: "比较", pinyin: "bǐjiào", meaning: "khá, tương đối" },
          { hanzi: "成绩", pinyin: "chéngjì", meaning: "thành tích" },
          { hanzi: "马马虎虎", pinyin: "mǎmǎhūhū", meaning: "bình thường, tàm tạm" },
          { hanzi: "班", pinyin: "bān", meaning: "lớp" },
          { hanzi: "同学", pinyin: "tóngxué", meaning: "bạn cùng lớp" },
          { hanzi: "努力", pinyin: "nǔlì", meaning: "chăm chỉ, nỗ lực" },
          { hanzi: "非常", pinyin: "fēicháng", meaning: "rất, vô cùng" },
          { hanzi: "宿舍", pinyin: "sùshè", meaning: "ký túc xá" },
          { hanzi: "空调", pinyin: "kōngtiáo", meaning: "máy điều hòa" },
          { hanzi: "同屋", pinyin: "tóngwū", meaning: "bạn cùng phòng" },
          { hanzi: "离", pinyin: "lí", meaning: "cách" },
          { hanzi: "教室", pinyin: "jiàoshì", meaning: "lớp học, phòng học" },
          { hanzi: "近", pinyin: "jìn", meaning: "gần" },
          { hanzi: "远", pinyin: "yuǎn", meaning: "xa" },
          { hanzi: "学校", pinyin: "xuéxiào", meaning: "trường học" },
          { hanzi: "留学生", pinyin: "liúxuéshēng", meaning: "lưu học sinh" },
          { hanzi: "挺...的", pinyin: "tǐng...de", meaning: "khá, rất" },
          { hanzi: "食堂", pinyin: "shítáng", meaning: "nhà ăn" },
          { hanzi: "不错", pinyin: "búcuò", meaning: "khá tốt, không tệ" }
        ],
        dialogueHighlights: [
          { teacherQuestion: "Gần đây sức khỏe của bạn có tốt không?", studentAnswer: "最近你身体好吗", pinyinAnswer: "Zuìjìn nǐ shēntǐ hǎo ma", vietnameseMeaning: "Gần đây sức khỏe của bạn có tốt không?" },
          { teacherQuestion: "Sức khỏe của tôi rất tốt.", studentAnswer: "我身体很好", pinyinAnswer: "Wǒ shēntǐ hěn hǎo", vietnameseMeaning: "Sức khỏe của tôi rất tốt." },
          { teacherQuestion: "Bạn học có bận không?", studentAnswer: "你学习忙吗", pinyinAnswer: "Nǐ xuéxí máng ma", vietnameseMeaning: "Bạn học có bận không?" },
          { teacherQuestion: "Việc học của tôi khá bận.", studentAnswer: "我学习比较忙", pinyinAnswer: "Wǒ xuéxí bǐjiào máng", vietnameseMeaning: "Việc học của tôi khá bận." },
          { teacherQuestion: "Thành tích học tập của bạn có tốt không?", studentAnswer: "你成绩好吗", pinyinAnswer: "Nǐ chéngjì hǎo ma", vietnameseMeaning: "Thành tích học tập của bạn có tốt không?" },
          { teacherQuestion: "Bình thường thôi, tàm tạm.", studentAnswer: "马马虎虎", pinyinAnswer: "Mǎmǎhūhū", vietnameseMeaning: "Bình thường thôi, tàm tạm." },
          { teacherQuestion: "Các bạn cùng lớp của bạn học có chăm chỉ không?", studentAnswer: "你们班同学学习努力吗", pinyinAnswer: "Nǐmen bān tóngxué xuéxí nǔlì ma", vietnameseMeaning: "Các bạn cùng lớp của bạn học có chăm chỉ không?" },
          { teacherQuestion: "Họ học tập rất chăm chỉ.", studentAnswer: "他们学习非常努力", pinyinAnswer: "Tāmen xuéxí fēicháng nǔlì", vietnameseMeaning: "Họ học tập rất chăm chỉ." },
          { teacherQuestion: "Ký túc xá của bạn có rộng không?", studentAnswer: "你的宿舍大不大", pinyinAnswer: "Nǐ de sùshè dà bu dà", vietnameseMeaning: "Ký túc xá của bạn có rộng không?" },
          { teacherQuestion: "Ký túc xá của tôi không rộng lắm.", studentAnswer: "我的宿舍不太大", pinyinAnswer: "Wǒ de sùshè bú tài dà", vietnameseMeaning: "Ký túc xá của tôi không rộng lắm." },
          { teacherQuestion: "Trong ký túc xá có điều hòa không?", studentAnswer: "宿舍里有没有空调", pinyinAnswer: "Sùshè lǐ yǒu méiyǒu kōngtiáo", vietnameseMeaning: "Trong ký túc xá có điều hòa không?" },
          { teacherQuestion: "Trong ký túc xá có điều hòa.", studentAnswer: "宿舍里有空调", pinyinAnswer: "Sùshè lǐ yǒu kōngtiáo", vietnameseMeaning: "Trong ký túc xá có điều hòa." },
          { teacherQuestion: "Bạn có bạn cùng phòng không?", studentAnswer: "你有没有同屋", pinyinAnswer: "Nǐ yǒu méiyǒu tóngwū", vietnameseMeaning: "Bạn có bạn cùng phòng không?" },
          { teacherQuestion: "Tôi không có bạn cùng phòng.", studentAnswer: "我没有同屋", pinyinAnswer: "Wǒ méiyǒu tóngwū", vietnameseMeaning: "Tôi không có bạn cùng phòng." },
          { teacherQuestion: "Ký túc xá của bạn cách lớp học có xa không?", studentAnswer: "你的宿舍离教室远不远", pinyinAnswer: "Nǐ de sùshè lí jiàoshì yuǎn bu yuǎn", vietnameseMeaning: "Ký túc xá của bạn cách lớp học có xa không?" },
          { teacherQuestion: "Ký túc xá của tôi rất gần lớp học.", studentAnswer: "我的宿舍离教室很近", pinyinAnswer: "Wǒ de sùshè lí jiàoshì hěn jìn", vietnameseMeaning: "Ký túc xá của tôi rất gần lớp học." },
          { teacherQuestion: "Trường của các bạn có đông học sinh không?", studentAnswer: "你们学校学生多不多", pinyinAnswer: "Nǐmen xuéxiào xuésheng duō bu duō", vietnameseMeaning: "Trường của các bạn có đông học sinh không?" },
          { teacherQuestion: "Trường chúng tôi có khá nhiều lưu học sinh.", studentAnswer: "我们学校留学生挺多的", pinyinAnswer: "Wǒmen xuéxiào liúxuéshēng tǐng duō de", vietnameseMeaning: "Trường chúng tôi có khá nhiều lưu học sinh." },
          { teacherQuestion: "Nhà ăn của trường các bạn thế nào?", studentAnswer: "你们学校食堂怎么样", pinyinAnswer: "Nǐmen xuéxiào shítáng zěnmeyàng", vietnameseMeaning: "Nhà ăn của trường các bạn thế nào?" },
          { teacherQuestion: "Nhà ăn của trường chúng tôi khá tốt.", studentAnswer: "我们学校食堂不错", pinyinAnswer: "Wǒmen xuéxiào shítáng búcuò", vietnameseMeaning: "Nhà ăn của trường chúng tôi khá tốt." }
        ]
      },
      {
        sectionNumber: 2,
        title: "Bài 7 Giao tiếp",
        chineseSubtitle: "校园与生活问答交际",
        pinyinSubtitle: "Xiàoyuán yǔ shēnghuó wèndá jiāojì",
        vietnameseSubtitle: "Luyện phản xạ 10 câu giao tiếp hai chiều",
        keyGrammar: "Giáo viên AI đóng vai trò người bản xứ Trung Quốc hỏi theo danh sách 10 câu trong “ ”. Học sinh trả lời đúng ý nghĩa và đúng ngữ pháp là đạt yêu cầu. Khen “Tốt lắm” hoặc “Rất tốt”. Nếu sai sửa ngữ pháp, sửa phát âm chuẩn Bắc Kinh.",
        vocabulary: [
          { hanzi: "最近", pinyin: "zuìjìn", meaning: "gần đây" },
          { hanzi: "身体", pinyin: "shēntǐ", meaning: "sức khỏe" },
          { hanzi: "学习", pinyin: "xuéxí", meaning: "học tập" },
          { hanzi: "成绩", pinyin: "chéngjì", meaning: "thành tích" },
          { hanzi: "同学", pinyin: "tóngxué", meaning: "bạn cùng lớp" },
          { hanzi: "努力", pinyin: "nǔlì", meaning: "chăm chỉ" },
          { hanzi: "宿舍", pinyin: "sùshè", meaning: "ký túc xá" },
          { hanzi: "空调", pinyin: "kōngtiáo", meaning: "máy điều hòa" },
          { hanzi: "同屋", pinyin: "tóngwū", meaning: "bạn cùng phòng" },
          { hanzi: "离", pinyin: "lí", meaning: "cách" },
          { hanzi: "教室", pinyin: "jiàoshì", meaning: "lớp học" },
          { hanzi: "远", pinyin: "yuǎn", meaning: "xa" },
          { hanzi: "学校", pinyin: "xuéxiào", meaning: "trường học" },
          { hanzi: "食堂", pinyin: "shítáng", meaning: "nhà ăn" },
          { hanzi: "怎么样", pinyin: "zěnmeyàng", meaning: "thế nào" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "最近你身体好吗？",
            pinyinQuestion: "Zuìjìn nǐ shēntǐ hǎo ma?",
            studentAnswer: "我身体很好 / 我很好 / 挺好的 / 马马虎虎",
            pinyinAnswer: "Wǒ shēntǐ hěn hǎo...",
            vietnameseMeaning: "Gần đây sức khỏe của bạn có tốt không? -> Sức khỏe tôi rất tốt / Tôi rất khỏe..."
          },
          {
            teacherQuestion: "你学习忙吗？",
            pinyinQuestion: "Nǐ xuéxí máng ma?",
            studentAnswer: "我学习比较忙 / 我不忙 / 很忙 / 不太忙",
            pinyinAnswer: "Wǒ xuéxí bǐjiào máng...",
            vietnameseMeaning: "Bạn học có bận không? -> Việc học của tôi khá bận / Tôi không bận..."
          },
          {
            teacherQuestion: "你成绩好吗？",
            pinyinQuestion: "Nǐ chéngjì hǎo ma?",
            studentAnswer: "我成绩很好 / 马马虎虎 / 挺好的 / 还行",
            pinyinAnswer: "Wǒ chéngjì hěn hǎo...",
            vietnameseMeaning: "Thành tích học tập của bạn có tốt không? -> Rất tốt / Bình thường thôi..."
          },
          {
            teacherQuestion: "你们班同学学习努力吗？",
            pinyinQuestion: "Nǐmen bān tóngxué xuéxí nǔlì ma?",
            studentAnswer: "他们学习非常努力 / 很努力 / 挺努力的",
            pinyinAnswer: "Tāmen xuéxí fēicháng nǔlì...",
            vietnameseMeaning: "Các bạn cùng lớp bạn học có chăm chỉ không? -> Họ học rất chăm chỉ..."
          },
          {
            teacherQuestion: "你的宿舍大不大？",
            pinyinQuestion: "Nǐ de sùshè dà bu dà?",
            studentAnswer: "我的宿舍不太大 / 很大 / 不大 / 挺大的",
            pinyinAnswer: "Wǒ de sùshè bú tài dà...",
            vietnameseMeaning: "Ký túc xá của bạn có rộng không? -> Ký túc xá của tôi không rộng lắm..."
          },
          {
            teacherQuestion: "宿舍里有没有空调？",
            pinyinQuestion: "Sùshè lǐ yǒu méiyǒu kōngtiáo?",
            studentAnswer: "宿舍里有空调 / 宿舍里没有空调 / 有 / 没有",
            pinyinAnswer: "Sùshè lǐ yǒu kōngtiáo...",
            vietnameseMeaning: "Trong ký túc xá có điều hòa không? -> Có điều hòa / Không có điều hòa..."
          },
          {
            teacherQuestion: "你有没有同屋？",
            pinyinQuestion: "Nǐ yǒu méiyǒu tóngwū?",
            studentAnswer: "我没有同屋 / 我有同屋 / 有 / 没有",
            pinyinAnswer: "Wǒ méiyǒu tóngwū...",
            vietnameseMeaning: "Bạn có bạn cùng phòng không? -> Tôi không có bạn cùng phòng / Tôi có..."
          },
          {
            teacherQuestion: "你的宿舍离教室远不远？",
            pinyinQuestion: "Nǐ de sùshè lí jiàoshì yuǎn bu yuǎn?",
            studentAnswer: "我的宿舍离教室很近 / 不远 / 挺近的 / 有点儿远",
            pinyinAnswer: "Wǒ de sùshè lí jiàoshì hěn jìn...",
            vietnameseMeaning: "Ký túc xá cách lớp học xa không? -> Rất gần lớp học / Không xa..."
          },
          {
            teacherQuestion: "你们学校学生多不多？",
            pinyinQuestion: "Nǐmen xuéxiào xuésheng duō bu duō?",
            studentAnswer: "我们学校留学生挺多的 / 学生很多 / 不太多",
            pinyinAnswer: "Wǒmen xuéxiào liúxuéshēng tǐng duō de...",
            vietnameseMeaning: "Trường các bạn có đông học sinh không? -> Khá nhiều lưu học sinh / Rất đông..."
          },
          {
            teacherQuestion: "你们学校食堂怎么样？",
            pinyinQuestion: "Nǐmen xuéxiào shítáng zěnmeyàng?",
            studentAnswer: "我们学校食堂不错 / 很好 / 挺好的 / 还行",
            pinyinAnswer: "Wǒmen xuéxiào shítáng búcuò...",
            vietnameseMeaning: "Nhà ăn trường các bạn thế nào? -> Khá tốt / Rất tốt / Tàm tạm..."
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Bài 8 Dịch câu",
        chineseSubtitle: "翻译句子",
        pinyinSubtitle: "Fānyì jùzi",
        vietnameseSubtitle: "Luyện dịch 27 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt, học sinh dịch sang tiếng Trung chuẩn Bắc Kinh",
        vocabulary: [
          { hanzi: "哪国人", pinyin: "nǎ guó rén", meaning: "người nước nào" },
          { hanzi: "德国人", pinyin: "Déguó rén", meaning: "người Đức" },
          { hanzi: "什么名字", pinyin: "shénme míngzi", meaning: "tên gì" },
          { hanzi: "陈文南", pinyin: "Chén Wénnán", meaning: "Trần Văn Nam" },
          { hanzi: "贵姓", pinyin: "guìxìng", meaning: "quý danh, quý họ" },
          { hanzi: "外语中心", pinyin: "wàiyǔ zhōngxīn", meaning: "trung tâm ngoại ngữ" },
          { hanzi: "学生", pinyin: "xuésheng", meaning: "học sinh" },
          { hanzi: "老师", pinyin: "lǎoshī", meaning: "giáo viên" },
          { hanzi: "住", pinyin: "zhù", meaning: "sống, ở" },
          { hanzi: "北宁", pinyin: "Běiníng", meaning: "Bắc Ninh" },
          { hanzi: "几号楼", pinyin: "jǐ hào lóu", meaning: "tòa nhà số mấy" },
          { hanzi: "房间", pinyin: "fángjiān", meaning: "phòng" },
          { hanzi: "电话号码", pinyin: "diànhuà hàomǎ", meaning: "số điện thoại" },
          { hanzi: "每天下午", pinyin: "měitiān xiàwǔ", meaning: "mỗi buổi chiều" },
          { hanzi: "宿舍", pinyin: "sùshè", meaning: "ký túc xá" },
          { hanzi: "图书馆", pinyin: "túshūguǎn", meaning: "thư viện" },
          { hanzi: "中国朋友", pinyin: "Zhōngguó péngyou", meaning: "bạn Trung Quốc" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "Bạn là người nước nào?",
            studentAnswer: "你是哪国人",
            pinyinAnswer: "Nǐ shì nǎ guó rén",
            vietnameseMeaning: "Bạn là người nước nào?"
          },
          {
            teacherQuestion: "Tôi là người Đức.",
            studentAnswer: "我是德国人",
            pinyinAnswer: "Wǒ shì Déguó rén",
            vietnameseMeaning: "Tôi là người Đức."
          },
          {
            teacherQuestion: "Bạn tên là gì?",
            studentAnswer: "你叫什么名字",
            pinyinAnswer: "Nǐ jiào shénme míngzi",
            vietnameseMeaning: "Bạn tên là gì?"
          },
          {
            teacherQuestion: "Tôi tên là Trần Văn Nam.",
            studentAnswer: "我叫陈文南",
            pinyinAnswer: "Wǒ jiào Chén Wénnán",
            vietnameseMeaning: "Tôi tên là Trần Văn Nam."
          },
          {
            teacherQuestion: "Xin hỏi, quý danh của ngài là gì?",
            studentAnswer: "请问!您贵姓",
            pinyinAnswer: "Qǐngwèn! Nín guìxìng",
            vietnameseMeaning: "Xin hỏi, quý danh của ngài là gì?"
          },
          {
            teacherQuestion: "Tôi họ Vương.",
            studentAnswer: "我姓王",
            pinyinAnswer: "Wǒ xìng Wáng",
            vietnameseMeaning: "Tôi họ Vương."
          },
          {
            teacherQuestion: "Bạn học gì?",
            studentAnswer: "你学习什么",
            pinyinAnswer: "Nǐ xuéxí shénme",
            vietnameseMeaning: "Bạn học gì?"
          },
          {
            teacherQuestion: "Tôi học tiếng Trung.",
            studentAnswer: "我学习汉语",
            pinyinAnswer: "Wǒ xuéxí Hànyǔ",
            vietnameseMeaning: "Tôi học tiếng Trung."
          },
          {
            teacherQuestion: "Bạn học tiếng Trung ở đâu?",
            studentAnswer: "你在哪儿学习汉语",
            pinyinAnswer: "Nǐ zài nǎr xuéxí Hànyǔ",
            vietnameseMeaning: "Bạn học tiếng Trung ở đâu?"
          },
          {
            teacherQuestion: "Tôi học tiếng Trung ở trung tâm ngoại ngữ.",
            studentAnswer: "我在外语中心学习汉语",
            pinyinAnswer: "Wǒ zài wàiyǔ zhōngxīn xuéxí Hànyǔ",
            vietnameseMeaning: "Tôi học tiếng Trung ở trung tâm ngoại ngữ."
          },
          {
            teacherQuestion: "Lớp các bạn có bao nhiêu học sinh?",
            studentAnswer: "你们班有多少学生",
            pinyinAnswer: "Nǐmen bān yǒu duōshao xuésheng",
            vietnameseMeaning: "Lớp các bạn có bao nhiêu học sinh?"
          },
          {
            teacherQuestion: "Lớp chúng tôi có 15 học sinh.",
            studentAnswer: "我们班有十五个学生",
            pinyinAnswer: "Wǒmen bān yǒu shíwǔ ge xuésheng",
            vietnameseMeaning: "Lớp chúng tôi có 15 học sinh."
          },
          {
            teacherQuestion: "Có mấy giáo viên dạy các bạn?",
            studentAnswer: "几位老师教你们",
            pinyinAnswer: "Jǐ wèi lǎoshī jiāo nǐmen",
            vietnameseMeaning: "Có mấy giáo viên dạy các bạn?"
          },
          {
            teacherQuestion: "Có hai giáo viên dạy chúng tôi.",
            studentAnswer: "两位老师教我们",
            pinyinAnswer: "Liǎng wèi lǎoshī jiāo wǒmen",
            vietnameseMeaning: "Có hai giáo viên dạy chúng tôi."
          },
          {
            teacherQuestion: "Bạn sống ở đâu?",
            studentAnswer: "你住哪儿",
            pinyinAnswer: "Nǐ zhù nǎr",
            vietnameseMeaning: "Bạn sống ở đâu?"
          },
          {
            teacherQuestion: "Tôi sống ở Bắc Ninh.",
            studentAnswer: "我住北宁",
            pinyinAnswer: "Wǒ zhù Běiníng",
            vietnameseMeaning: "Tôi sống ở Bắc Ninh."
          },
          {
            teacherQuestion: "Bạn sống ở tòa nhà số mấy?",
            studentAnswer: "你住几号楼",
            pinyinAnswer: "Nǐ zhù jǐ hào lóu",
            vietnameseMeaning: "Bạn sống ở tòa nhà số mấy?"
          },
          {
            teacherQuestion: "Tôi sống ở tòa nhà số 7.",
            studentAnswer: "我住七号楼",
            pinyinAnswer: "Wǒ zhù qī hào lóu",
            vietnameseMeaning: "Tôi sống ở tòa nhà số 7."
          },
          {
            teacherQuestion: "Phòng của bạn là phòng số bao nhiêu?",
            studentAnswer: "你的房间是多少号",
            pinyinAnswer: "Nǐ de fángjiān shì duōshao hào",
            vietnameseMeaning: "Phòng của bạn là phòng số bao nhiêu?"
          },
          {
            teacherQuestion: "Phòng của tôi là phòng số 109.",
            studentAnswer: "我的房间是109号",
            pinyinAnswer: "Wǒ de fángjiān shì yāo líng jiǔ hào",
            vietnameseMeaning: "Phòng của tôi là phòng số 109."
          },
          {
            teacherQuestion: "Số điện thoại của bạn là bao nhiêu?",
            studentAnswer: "你的电话号码是多少",
            pinyinAnswer: "Nǐ de diànhuà hàomǎ shì duōshao",
            vietnameseMeaning: "Số điện thoại của bạn là bao nhiêu?"
          },
          {
            teacherQuestion: "Số điện thoại của tôi là 036926892.",
            studentAnswer: "我的电话号码 是036926892",
            pinyinAnswer: "Wǒ de diànhuà hàomǎ shì líng sān liù jiǔ èr liù bā jiǔ èr",
            vietnameseMeaning: "Số điện thoại của tôi là 036926892."
          },
          {
            teacherQuestion: "Mỗi buổi chiều bạn làm gì?",
            studentAnswer: "每天下午你做什么",
            pinyinAnswer: "Měitiān xiàwǔ nǐ zuò shénme",
            vietnameseMeaning: "Mỗi buổi chiều bạn làm gì?"
          },
          {
            teacherQuestion: "Đôi khi tôi nghỉ ngơi trong ký túc xá.",
            studentAnswer: "有时候在宿舍休息",
            pinyinAnswer: "Yǒushíhou zài sùshè xiūxi",
            vietnameseMeaning: "Đôi khi tôi nghỉ ngơi trong ký túc xá."
          },
          {
            teacherQuestion: "Đôi khi tôi đến thư viện học bài.",
            studentAnswer: "有时候去图书馆学习",
            pinyinAnswer: "Yǒushíhou qù túshūguǎn xuéxí",
            vietnameseMeaning: "Đôi khi tôi đến thư viện học bài."
          },
          {
            teacherQuestion: "Bạn học cùng với ai?",
            studentAnswer: "你跟谁一起学习",
            pinyinAnswer: "Nǐ gēn shéi yìqǐ xuéxí",
            vietnameseMeaning: "Bạn học cùng với ai?"
          },
          {
            teacherQuestion: "Tôi học cùng với người bạn Trung Quốc của tôi.",
            studentAnswer: "我跟我的中国朋友一起学习",
            pinyinAnswer: "Wǒ gēn wǒ de Zhōngguó péngyou yìqǐ xuéxí",
            vietnameseMeaning: "Tôi học cùng với người bạn Trung Quốc của tôi."
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Bài 8 Giao tiếp",
        chineseSubtitle: "流利会话与双向反应",
        pinyinSubtitle: "Liúlì huìhuà yǔ shuāngxiàng fǎnyìng",
        vietnameseSubtitle: "Luyện phản xạ 13 câu giao tiếp hai chiều",
        keyGrammar: "Phản xạ hỏi đáp tự nhiên, linh hoạt thông tin cá nhân",
        vocabulary: [
          { hanzi: "哪国人", pinyin: "nǎ guó rén", meaning: "người nước nào" },
          { hanzi: "什么名字", pinyin: "shénme míngzi", meaning: "tên gì" },
          { hanzi: "贵姓", pinyin: "guìxìng", meaning: "quý danh, quý họ" },
          { hanzi: "学习", pinyin: "xuéxí", meaning: "học tập" },
          { hanzi: "外语中心", pinyin: "wàiyǔ zhōngxīn", meaning: "trung tâm ngoại ngữ" },
          { hanzi: "班", pinyin: "bān", meaning: "lớp" },
          { hanzi: "学生", pinyin: "xuésheng", meaning: "học sinh" },
          { hanzi: "老师", pinyin: "lǎoshī", meaning: "giáo viên" },
          { hanzi: "住", pinyin: "zhù", meaning: "ở, sống" },
          { hanzi: "几号楼", pinyin: "jǐ hào lóu", meaning: "tòa nhà số mấy" },
          { hanzi: "房间", pinyin: "fángjiān", meaning: "phòng" },
          { hanzi: "电话号码", pinyin: "diànhuà hàomǎ", meaning: "số điện thoại" },
          { hanzi: "每天下午", pinyin: "měitiān xiàwǔ", meaning: "mỗi buổi chiều" },
          { hanzi: "宿舍", pinyin: "sùshè", meaning: "ký túc xá" },
          { hanzi: "图书馆", pinyin: "túshūguǎn", meaning: "thư viện" },
          { hanzi: "跟...一起", pinyin: "gēn... yìqǐ", meaning: "cùng với..." }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "你是哪国人？",
            pinyinQuestion: "Nǐ shì nǎ guó rén?",
            studentAnswer: "我是越南人 / 我是中国人 / 我是德国人",
            pinyinAnswer: "Wǒ shì Yuènán rén...",
            vietnameseMeaning: "Bạn là người nước nào? -> Tôi là người Việt Nam / Tôi là người Trung Quốc..."
          },
          {
            teacherQuestion: "你叫什么名字？",
            pinyinQuestion: "Nǐ jiào shénme míngzi?",
            studentAnswer: "我叫陈文南 / 我叫阮文安 / 我叫玛丽",
            pinyinAnswer: "Wǒ jiào Chén Wénnán...",
            vietnameseMeaning: "Bạn tên là gì? -> Tôi tên là Trần Văn Nam / Nguyễn Văn An..."
          },
          {
            teacherQuestion: "请问，您贵姓？",
            pinyinQuestion: "Qǐngwèn, nín guìxìng?",
            studentAnswer: "我姓王 / 我姓陈 / 我姓李",
            pinyinAnswer: "Wǒ xìng Wáng...",
            vietnameseMeaning: "Xin hỏi, quý danh của ngài là gì? -> Tôi họ Vương / Tôi họ Trần..."
          },
          {
            teacherQuestion: "你学习什么？",
            pinyinQuestion: "Nǐ xuéxí shénme?",
            studentAnswer: "我学习汉语 / 我学习中文 / 我学英语",
            pinyinAnswer: "Wǒ xuéxí Hànyǔ...",
            vietnameseMeaning: "Bạn học gì? -> Tôi học tiếng Trung / Tôi học tiếng Anh..."
          },
          {
            teacherQuestion: "你在哪儿学习汉语？",
            pinyinQuestion: "Nǐ zài nǎr xuéxí Hànyǔ?",
            studentAnswer: "我在外语中心学习汉语 / 我在北京大学学习 / 在学校",
            pinyinAnswer: "Wǒ zài wàiyǔ zhōngxīn xuéxí Hànyǔ...",
            vietnameseMeaning: "Bạn học tiếng Trung ở đâu? -> Tôi học tiếng Trung ở trung tâm ngoại ngữ..."
          },
          {
            teacherQuestion: "你们班有多少学生？",
            pinyinQuestion: "Nǐmen bān yǒu duōshao xuésheng?",
            studentAnswer: "我们班有十五个学生 / 有二十个学生 / 十五个",
            pinyinAnswer: "Wǒmen bān yǒu shíwǔ ge xuésheng...",
            vietnameseMeaning: "Lớp các bạn có bao nhiêu học sinh? -> Lớp chúng tôi có 15 học sinh..."
          },
          {
            teacherQuestion: "几位老师教你们？",
            pinyinQuestion: "Jǐ wèi lǎoshī jiāo nǐmen?",
            studentAnswer: "两位老师教我们 / 一位老师教我们 / 两个老师",
            pinyinAnswer: "Liǎng wèi lǎoshī jiāo wǒmen...",
            vietnameseMeaning: "Có mấy giáo viên dạy các bạn? -> Có hai giáo viên dạy chúng tôi..."
          },
          {
            teacherQuestion: "你住哪儿？",
            pinyinQuestion: "Nǐ zhù nǎr?",
            studentAnswer: "我住北宁 / 我住河内 / 我住留学生宿舍",
            pinyinAnswer: "Wǒ zhù Běiníng...",
            vietnameseMeaning: "Bạn sống ở đâu? -> Tôi sống ở Bắc Ninh / Tôi sống ở Hà Nội..."
          },
          {
            teacherQuestion: "你住几号楼？",
            pinyinQuestion: "Nǐ zhù jǐ hào lóu?",
            studentAnswer: "我住七号楼 / 我住八号楼 / 七号楼",
            pinyinAnswer: "Wǒ zhù qī hào lóu...",
            vietnameseMeaning: "Bạn sống ở tòa nhà số mấy? -> Tôi sống ở tòa nhà số 7..."
          },
          {
            teacherQuestion: "你的房间是多少号？",
            pinyinQuestion: "Nǐ de fángjiān shì duōshao hào?",
            studentAnswer: "我的房间是109号 / 108号 / 205号",
            pinyinAnswer: "Wǒ de fángjiān shì yāo líng jiǔ hào...",
            vietnameseMeaning: "Phòng của bạn là phòng số bao nhiêu? -> Phòng của tôi là phòng số 109..."
          },
          {
            teacherQuestion: "你的电话号码是多少？",
            pinyinQuestion: "Nǐ de diànhuà hàomǎ shì duōshao?",
            studentAnswer: "我的电话号码是036926892 / 0912345678",
            pinyinAnswer: "Wǒ de diànhuà hàomǎ shì líng sān liù jiǔ èr liù bā jiǔ èr...",
            vietnameseMeaning: "Số điện thoại của bạn là bao nhiêu? -> Số điện thoại của tôi là 036926892..."
          },
          {
            teacherQuestion: "每天下午你做什么？",
            pinyinQuestion: "Měitiān xiàwǔ nǐ zuò shénme?",
            studentAnswer: "有时候在宿舍休息，有时候去图书馆学习 / 我去运动",
            pinyinAnswer: "Yǒushíhou zài sùshè xiūxi, yǒushíhou qù túshūguǎn xuéxí...",
            vietnameseMeaning: "Mỗi buổi chiều bạn làm gì? -> Đôi khi nghỉ ở ký túc xá, đôi khi đi thư viện học bài..."
          },
          {
            teacherQuestion: "你跟谁一起学习？",
            pinyinQuestion: "Nǐ gēn shéi yìqǐ xuéxí?",
            studentAnswer: "我跟我的中国朋友一起学习 / 我跟同屋一起学习",
            pinyinAnswer: "Wǒ gēn wǒ de Zhōngguó péngyou yìqǐ xuéxí...",
            vietnameseMeaning: "Bạn học cùng với ai? -> Tôi học cùng người bạn Trung Quốc của tôi..."
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 5,
    internalLessonIndex: 5,
    title: "Hội thoại phản xạ",
    chineseTitle: "时间流逝与学习生活",
    pinyin: "Shíjiān liúshì yǔ xuéxí shēnghuó",
    theme: "Thời gian & Sinh hoạt học tập",
    summary: "Luyện phản xạ về cảm nhận thời gian trôi nhanh, cuộc sống du học sinh tại Trung Quốc và kế hoạch về nước.",
    grammarPoints: [
      "过得 + Tính từ: Trôi qua như thế nào (过得真快, 过得很好).",
      "Bổ ngữ thời lượng: Đã đến được bao lâu (来中国一个多月了).",
      "就要... 了: Sắp sửa... (明天就要回国了)."
    ],
    vocabulary: [
      { hanzi: "流逝", pinyin: "liúshì", meaning: "trôi qua" },
      { hanzi: "回国", pinyin: "huíguó", meaning: "về nước" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "时间过得怎么样？",
        pinyinQuestion: "Shíjiān guò de zěnmeyàng?",
        studentAnswer: "时间过得真快。",
        pinyinAnswer: "Shíjiān guò de zhēn kuài.",
        vietnameseMeaning: "Thời gian trôi qua nhanh thật."
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Bài 9 Dịch câu",
        chineseSubtitle: "翻译句子",
        pinyinSubtitle: "Fānyì jùzi",
        vietnameseSubtitle: "Luyện dịch 34 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt, học sinh dịch sang tiếng Trung chuẩn Bắc Kinh",
        vocabulary: [
          { hanzi: "想家", pinyin: "xiǎngjiā", meaning: "nhớ nhà" },
          { hanzi: "当然", pinyin: "dāngrán", meaning: "tất nhiên" },
          { hanzi: "几口人", pinyin: "jǐ kǒu rén", meaning: "mấy người (nhân khẩu)" },
          { hanzi: "兄弟姐妹", pinyin: "xiōngdì jiěmèi", meaning: "anh chị em" },
          { hanzi: "独生女", pinyin: "dúshēngnǚ", meaning: "con gái một" },
          { hanzi: "父亲", pinyin: "fùqīn", meaning: "cha, bố" },
          { hanzi: "母亲", pinyin: "mǔqīn", meaning: "mẹ" },
          { hanzi: "医院", pinyin: "yīyuàn", meaning: "bệnh viện" },
          { hanzi: "医生", pinyin: "yīshēng", meaning: "bác sĩ" },
          { hanzi: "公司职员", pinyin: "gōngsī zhíyuán", meaning: "nhân viên công ty" },
          { hanzi: "记者", pinyin: "jìzhě", meaning: "phóng viên" },
          { hanzi: "鸿海公司", pinyin: "Hónghǎi gōngsī", meaning: "công ty Hồng Hải" },
          { hanzi: "名片", pinyin: "míngpiàn", meaning: "danh thiếp" },
          { hanzi: "多大年纪", pinyin: "duō dà niánjì", meaning: "bao nhiêu tuổi" },
          { hanzi: "大哥", pinyin: "dàgē", meaning: "anh cả" },
          { hanzi: "二哥", pinyin: "èrgē", meaning: "anh hai" },
          { hanzi: "秘密", pinyin: "mìmì", meaning: "bí mật" },
          { hanzi: "孩子", pinyin: "háizi", meaning: "đứa trẻ, con" },
          { hanzi: "儿子", pinyin: "érzi", meaning: "con trai" },
          { hanzi: "真可爱", pinyin: "zhēn kě'ài", meaning: "thật đáng yêu" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "bạn có nhớ nhà không?",
            studentAnswer: "你想不想家",
            pinyinAnswer: "Nǐ xiǎng bu xiǎng jiā",
            vietnameseMeaning: "bạn có nhớ nhà không?"
          },
          {
            teacherQuestion: "Tất nhiên là nhớ.",
            studentAnswer: "当然想",
            pinyinAnswer: "Dāngrán xiǎng",
            vietnameseMeaning: "Tất nhiên là nhớ."
          },
          {
            teacherQuestion: "Gia đình bạn có mấy người?",
            studentAnswer: "你家有几口人",
            pinyinAnswer: "Nǐ jiā yǒu jǐ kǒu rén",
            vietnameseMeaning: "Gia đình bạn có mấy người?"
          },
          {
            teacherQuestion: "Gia đình tôi có năm người.",
            studentAnswer: "我家有五口人",
            pinyinAnswer: "Wǒ jiā yǒu wǔ kǒu rén",
            vietnameseMeaning: "Gia đình tôi có năm người."
          },
          {
            teacherQuestion: "Gia đình bạn có những ai?",
            studentAnswer: "你家有什么人",
            pinyinAnswer: "Nǐ jiā yǒu shénme rén",
            vietnameseMeaning: "Gia đình bạn có những ai?"
          },
          {
            teacherQuestion: "Bố, mẹ, hai anh trai và tôi.",
            studentAnswer: "爸爸.妈妈.两个哥哥和我",
            pinyinAnswer: "Bàba, māma, liǎng gè gēge hé wǒ",
            vietnameseMeaning: "Bố, mẹ, hai anh trai và tôi."
          },
          {
            teacherQuestion: "Bạn có anh chị em không?",
            studentAnswer: "你有没有兄弟姐妹",
            pinyinAnswer: "Nǐ yǒu méiyǒu xiōngdì jiěmèi",
            vietnameseMeaning: "Bạn có anh chị em không?"
          },
          {
            teacherQuestion: "Tôi không có anh chị em.",
            studentAnswer: "我没有兄弟姐妹",
            pinyinAnswer: "Wǒ méiyǒu xiōngdì jiěmèi",
            vietnameseMeaning: "Tôi không có anh chị em."
          },
          {
            teacherQuestion: "Tôi là con gái một.",
            studentAnswer: "我是独生女",
            pinyinAnswer: "Wǒ shì dúshēngnǚ",
            vietnameseMeaning: "Tôi là con gái một."
          },
          {
            teacherQuestion: "Bố bạn làm việc ở đâu?",
            studentAnswer: "你父亲在哪儿工作",
            pinyinAnswer: "Nǐ fùqīn zài nǎr gōngzuò",
            vietnameseMeaning: "Bố bạn làm việc ở đâu?"
          },
          {
            teacherQuestion: "Ông ấy làm việc ở bệnh viện.",
            studentAnswer: "他在医院工作",
            pinyinAnswer: "Tā zài yīyuàn gōngzuò",
            vietnameseMeaning: "Ông ấy làm việc ở bệnh viện."
          },
          {
            teacherQuestion: "Ông ấy là bác sĩ.",
            studentAnswer: "他是医生",
            pinyinAnswer: "Tā shì yīshēng",
            vietnameseMeaning: "Ông ấy là bác sĩ."
          },
          {
            teacherQuestion: "Thế còn mẹ bạn?",
            studentAnswer: "你母亲呢",
            pinyinAnswer: "Nǐ mǔqīn ne",
            vietnameseMeaning: "Thế còn mẹ bạn?"
          },
          {
            teacherQuestion: "Bà ấy không đi làm.",
            studentAnswer: "她不工作",
            pinyinAnswer: "Tā bù gōngzuò",
            vietnameseMeaning: "Bà ấy không đi làm."
          },
          {
            teacherQuestion: "Hai anh trai của bạn làm nghề gì?",
            studentAnswer: "两个哥哥做什么工作",
            pinyinAnswer: "Liǎng gè gēge zuò shénme gōngzuò",
            vietnameseMeaning: "Hai anh trai của bạn làm nghề gì?"
          },
          {
            teacherQuestion: "Họ đều là nhân viên công ty.",
            studentAnswer: "他们都是公司职员",
            pinyinAnswer: "Tāmen dōu shì gōngsī zhíyuán",
            vietnameseMeaning: "Họ đều là nhân viên công ty."
          },
          {
            teacherQuestion: "Bạn làm nghề gì?",
            studentAnswer: "你是做什么工作的",
            pinyinAnswer: "Nǐ shì zuò shénme gōngzuò de",
            vietnameseMeaning: "Bạn làm nghề gì?"
          },
          {
            teacherQuestion: "Tôi là phóng viên.",
            studentAnswer: "我是记者",
            pinyinAnswer: "Wǒ shì jìzhě",
            vietnameseMeaning: "Tôi là phóng viên."
          },
          {
            teacherQuestion: "Bạn làm việc ở đâu?",
            studentAnswer: "你在哪儿工作",
            pinyinAnswer: "Nǐ zài nǎr gōngzuò",
            vietnameseMeaning: "Bạn làm việc ở đâu?"
          },
          {
            teacherQuestion: "Tôi làm việc tại công ty Hồng Hải.",
            studentAnswer: "我在鸿海公司工作",
            pinyinAnswer: "Wǒ zài Hónghǎi gōngsī gōngzuò",
            vietnameseMeaning: "Tôi làm việc tại công ty Hồng Hải."
          },
          {
            teacherQuestion: "Đây là danh thiếp của tôi.",
            studentAnswer: "这是我的名片",
            pinyinAnswer: "Zhè shì wǒ de míngpiàn",
            vietnameseMeaning: "Đây là danh thiếp của tôi."
          },
          {
            teacherQuestion: "Năm nay bố mẹ bạn bao nhiêu tuổi?",
            studentAnswer: "你父母今年多大年纪",
            pinyinAnswer: "Nǐ fùmǔ jīnnián duō dà niánjì",
            vietnameseMeaning: "Năm nay bố mẹ bạn bao nhiêu tuổi?"
          },
          {
            teacherQuestion: "Năm nay bố tôi 60 tuổi.",
            studentAnswer: "我父亲今年六十岁",
            pinyinAnswer: "Wǒ fùqīn jīnnián liùshí suì",
            vietnameseMeaning: "Năm nay bố tôi 60 tuổi."
          },
          {
            teacherQuestion: "Năm nay mẹ tôi 58 tuổi.",
            studentAnswer: "我母亲今年五十八",
            pinyinAnswer: "Wǒ mǔqīn jīnnián wǔshíbā",
            vietnameseMeaning: "Năm nay mẹ tôi 58 tuổi."
          },
          {
            teacherQuestion: "Anh trai bạn năm nay bao nhiêu tuổi?",
            studentAnswer: "你哥哥今年多大",
            pinyinAnswer: "Nǐ gēge jīnnián duō dà",
            vietnameseMeaning: "Anh trai bạn năm nay bao nhiêu tuổi?"
          },
          {
            teacherQuestion: "Anh cả 32 tuổi.",
            studentAnswer: "大哥三十二",
            pinyinAnswer: "Dàgē sānshí'èr",
            vietnameseMeaning: "Anh cả 32 tuổi."
          },
          {
            teacherQuestion: "Anh hai 29 tuổi.",
            studentAnswer: "二哥二十九",
            pinyinAnswer: "Èrgē èrshíjiǔ",
            vietnameseMeaning: "Anh hai 29 tuổi."
          },
          {
            teacherQuestion: "Thế còn bạn?",
            studentAnswer: "你呢",
            pinyinAnswer: "Nǐ ne",
            vietnameseMeaning: "Thế còn bạn?"
          },
          {
            teacherQuestion: "Đây là bí mật.",
            studentAnswer: "这是秘密",
            pinyinAnswer: "Zhè shì mìmì",
            vietnameseMeaning: "Đây là bí mật."
          },
          {
            teacherQuestion: "Đây là con của ai?",
            studentAnswer: "这是谁的孩子",
            pinyinAnswer: "Zhè shì shéi de háizi",
            vietnameseMeaning: "Đây là con của ai?"
          },
          {
            teacherQuestion: "Đây là con trai của anh cả tôi.",
            studentAnswer: "这是我大哥的儿子",
            pinyinAnswer: "Zhè shì wǒ dàgē de érzi",
            vietnameseMeaning: "Đây là con trai của anh cả tôi."
          },
          {
            teacherQuestion: "Năm nay cháu mấy tuổi?",
            studentAnswer: "今年几岁",
            pinyinAnswer: "Jīnnián jǐ suì",
            vietnameseMeaning: "Năm nay cháu mấy tuổi?"
          },
          {
            teacherQuestion: "Năm nay cháu 5 tuổi.",
            studentAnswer: "今年五岁",
            pinyinAnswer: "Jīnnián wǔ suì",
            vietnameseMeaning: "Năm nay cháu 5 tuổi."
          },
          {
            teacherQuestion: "Đứa bé này thật đáng yêu!",
            studentAnswer: "这孩子真可爱",
            pinyinAnswer: "Zhè háizi zhēn kě'ài",
            vietnameseMeaning: "Đứa bé này thật đáng yêu!"
          }
        ]
      },
      {
        sectionNumber: 2,
        title: "Bài 9 Giao tiếp",
        chineseSubtitle: "流利会话与双向反应",
        pinyinSubtitle: "Liúlì huìhuà yǔ shuāngxiàng fǎnyìng",
        vietnameseSubtitle: "Luyện phản xạ 17 câu giao tiếp hai chiều",
        keyGrammar: "Phản xạ hỏi đáp tự nhiên gia đình, nghề nghiệp, tuổi tác",
        vocabulary: [
          { hanzi: "想家", pinyin: "xiǎngjiā", meaning: "nhớ nhà" },
          { hanzi: "几口人", pinyin: "jǐ kǒu rén", meaning: "mấy người" },
          { hanzi: "兄弟姐妹", pinyin: "xiōngdì jiěmèi", meaning: "anh chị em" },
          { hanzi: "工作", pinyin: "gōngzuò", meaning: "làm việc, công việc" },
          { hanzi: "名片", pinyin: "míngpiàn", meaning: "danh thiếp" },
          { hanzi: "多大年纪", pinyin: "duō dà niánjì", meaning: "bao nhiêu tuổi" },
          { hanzi: "可爱", pinyin: "kě'ài", meaning: "đáng yêu" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "你想不想家？",
            pinyinQuestion: "Nǐ xiǎng bu xiǎng jiā?",
            studentAnswer: "当然想 / 很想家 / 不想家",
            pinyinAnswer: "Dāngrán xiǎng...",
            vietnameseMeaning: "Bạn có nhớ nhà không? -> Tất nhiên là nhớ..."
          },
          {
            teacherQuestion: "你家有几口人？",
            pinyinQuestion: "Nǐ jiā yǒu jǐ kǒu rén?",
            studentAnswer: "我家有五口人 / 四口人 / 三口人",
            pinyinAnswer: "Wǒ jiā yǒu wǔ kǒu rén...",
            vietnameseMeaning: "Nhà bạn có mấy người? -> Nhà tôi có năm người..."
          },
          {
            teacherQuestion: "你家有什么人？",
            pinyinQuestion: "Nǐ jiā yǒu shénme rén?",
            studentAnswer: "爸爸、妈妈、两个哥哥和我",
            pinyinAnswer: "Bàba, māma, liǎng gè gēge hé wǒ",
            vietnameseMeaning: "Nhà bạn có những ai? -> Bố, mẹ, hai anh trai và tôi"
          },
          {
            teacherQuestion: "你有没有兄弟姐妹？",
            pinyinQuestion: "Nǐ yǒu méiyǒu xiōngdì jiěmèi?",
            studentAnswer: "我没有兄弟姐妹，我是独生女 / 我有两个哥哥",
            pinyinAnswer: "Wǒ méiyǒu xiōngdì jiěmèi, wǒ shì dúshēngnǚ...",
            vietnameseMeaning: "Bạn có anh chị em không? -> Tôi không có, tôi là con gái một..."
          },
          {
            teacherQuestion: "你父亲在哪儿工作？",
            pinyinQuestion: "Nǐ fùqīn zài nǎr gōngzuò?",
            studentAnswer: "他在医院工作 / 他在学校工作",
            pinyinAnswer: "Tā zài yīyuàn gōngzuò...",
            vietnameseMeaning: "Bố bạn làm việc ở đâu? -> Ông ấy làm ở bệnh viện..."
          },
          {
            teacherQuestion: "他是做什么的？",
            pinyinQuestion: "Tā shì zuò shénme de?",
            studentAnswer: "他是医生 / 他是老师 / 他是工程师",
            pinyinAnswer: "Tā shì yīshēng...",
            vietnameseMeaning: "Ông ấy làm nghề gì? -> Ông ấy là bác sĩ..."
          },
          {
            teacherQuestion: "你母亲呢？",
            pinyinQuestion: "Nǐ mǔqīn ne?",
            studentAnswer: "她不工作 / 她是老师 / 她也是医生",
            pinyinAnswer: "Tā bù gōngzuò...",
            vietnameseMeaning: "Thế còn mẹ bạn? -> Bà ấy không đi làm..."
          },
          {
            teacherQuestion: "两个哥哥做什么工作？",
            pinyinQuestion: "Liǎng gè gēge zuò shénme gōngzuò?",
            studentAnswer: "他们都是公司职员 / 一个是医生，一个是职员",
            pinyinAnswer: "Tāmen dōu shì gōngsī zhíyuán...",
            vietnameseMeaning: "Hai anh trai làm nghề gì? -> Họ đều là nhân viên công ty..."
          },
          {
            teacherQuestion: "你是做什么工作的？",
            pinyinQuestion: "Nǐ shì zuò shénme gōngzuò de?",
            studentAnswer: "我是记者 / 我是学生 / 我是翻译",
            pinyinAnswer: "Wǒ shì jìzhě...",
            vietnameseMeaning: "Bạn làm nghề gì? -> Tôi là phóng viên..."
          },
          {
            teacherQuestion: "你在哪儿工作？",
            pinyinQuestion: "Nǐ zài nǎr gōngzuò?",
            studentAnswer: "我在鸿海公司工作 / 我在学校工作",
            pinyinAnswer: "Wǒ zài Hónghǎi gōngsī gōngzuò...",
            vietnameseMeaning: "Bạn làm việc ở đâu? -> Tôi làm ở công ty Hồng Hải..."
          },
          {
            teacherQuestion: "这是你的名片吗？",
            pinyinQuestion: "Zhè shì nǐ de míngpiàn ma?",
            studentAnswer: "这是我的名片 / 是的，这是我的名片",
            pinyinAnswer: "Zhè shì wǒ de míngpiàn...",
            vietnameseMeaning: "Đây là danh thiếp của bạn phải không? -> Đúng vậy..."
          },
          {
            teacherQuestion: "你父母今年多大年纪？",
            pinyinQuestion: "Nǐ fùmǔ jīnnián duō dà niánjì?",
            studentAnswer: "我父亲六十岁，我母亲五十八岁",
            pinyinAnswer: "Wǒ fùqīn liùshí suì, wǒ mǔqīn wǔshíbā suì",
            vietnameseMeaning: "Năm nay bố mẹ bạn bao nhiêu tuổi? -> Bố 60, mẹ 58 tuổi"
          },
          {
            teacherQuestion: "你哥哥今年多大？",
            pinyinQuestion: "Nǐ gēge jīnnián duō dà?",
            studentAnswer: "大哥三十二，二哥二十九",
            pinyinAnswer: "Dàgē sānshí'èr, èrgē èrshíjiǔ",
            vietnameseMeaning: "Anh trai bạn năm nay bao nhiêu tuổi? -> Anh cả 32, anh hai 29"
          },
          {
            teacherQuestion: "你呢？",
            pinyinQuestion: "Nǐ ne?",
            studentAnswer: "这是秘密 / 我二十五岁",
            pinyinAnswer: "Zhè shì mìmì...",
            vietnameseMeaning: "Thế còn bạn? -> Đây là bí mật..."
          },
          {
            teacherQuestion: "这是谁的孩子？",
            pinyinQuestion: "Zhè shì shéi de háizi?",
            studentAnswer: "这是我大哥的儿子 / 这是我朋友的孩子",
            pinyinAnswer: "Zhè shì wǒ dàgē de érzi...",
            vietnameseMeaning: "Đây là con của ai? -> Đây là con trai của anh cả tôi"
          },
          {
            teacherQuestion: "今年几岁？",
            pinyinQuestion: "Jīnnián jǐ suì?",
            studentAnswer: "今年五岁 / 他今年五岁",
            pinyinAnswer: "Jīnnián wǔ suì...",
            vietnameseMeaning: "Năm nay cháu mấy tuổi? -> Năm nay cháu 5 tuổi"
          },
          {
            teacherQuestion: "这孩子真可爱吗？",
            pinyinQuestion: "Zhè háizi zhēn kě'ài ma?",
            studentAnswer: "这孩子真可爱 / 是的，真可爱 / 非常可爱",
            pinyinAnswer: "Zhè háizi zhēn kě'ài...",
            vietnameseMeaning: "Đứa bé này thật đáng yêu phải không? -> Đứa bé thật đáng yêu!"
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Bài 10 Dịch câu",
        chineseSubtitle: "时间、日期与约会翻译",
        pinyinSubtitle: "Shíjiān, rìqī yǔ yuēhuì fānyì",
        vietnameseSubtitle: "Luyện dịch 23 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt phát âm chuẩn, học sinh dịch sang tiếng Trung chuẩn giọng Bắc Kinh",
        vocabulary: [
          { hanzi: "几点", pinyin: "jǐ diǎn", meaning: "mấy giờ" },
          { hanzi: "一刻", pinyin: "yí kè", meaning: "15 phút, một khắc" },
          { hanzi: "早饭", pinyin: "zǎofàn", meaning: "bữa sáng" },
          { hanzi: "半", pinyin: "bàn", meaning: "rưỡi, nửa" },
          { hanzi: "上课", pinyin: "shàngkè", meaning: "lên lớp, vào học" },
          { hanzi: "从...到...", pinyin: "cóng... dào...", meaning: "từ... đến..." },
          { hanzi: "几号", pinyin: "jǐ hào", meaning: "ngày mấy" },
          { hanzi: "八月", pinyin: "bā yuè", meaning: "tháng Tám" },
          { hanzi: "八个月", pinyin: "bā gè yuè", meaning: "tám tháng" },
          { hanzi: "星期几", pinyin: "xīngqī jǐ", meaning: "thứ mấy" },
          { hanzi: "星期三", pinyin: "xīngqīsān", meaning: "thứ Tư" },
          { hanzi: "星期天", pinyin: "xīngqītiān", meaning: "Chủ nhật" },
          { hanzi: "星期六", pinyin: "xīngqīliù", meaning: "thứ Bảy" },
          { hanzi: "颐和园", pinyin: "Yíhéyuán", meaning: "Di Hòa Viên" },
          { hanzi: "出发", pinyin: "chūfā", meaning: "xuất phát" },
          { hanzi: "见面", pinyin: "jiànmiàn", meaning: "gặp mặt" },
          { hanzi: "差", pinyin: "chà", meaning: "kém" },
          { hanzi: "学校门口", pinyin: "xuéxiào ménkǒu", meaning: "cổng trường" },
          { hanzi: "等", pinyin: "děng", meaning: "đợi, chờ" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "Bây giờ là mấy giờ?",
            studentAnswer: "现在几点",
            pinyinAnswer: "Xiànzài jǐ diǎn",
            vietnameseMeaning: "Bây giờ là mấy giờ?"
          },
          {
            teacherQuestion: "Bây giờ là bảy giờ mười lăm phút.",
            studentAnswer: "现在七点一刻",
            pinyinAnswer: "Xiànzài qī diǎn yí kè",
            vietnameseMeaning: "Bây giờ là bảy giờ mười lăm phút."
          },
          {
            teacherQuestion: "Bạn ăn sáng lúc mấy giờ?",
            studentAnswer: "你几点 吃早饭",
            pinyinAnswer: "Nǐ jǐ diǎn chī zǎofàn",
            vietnameseMeaning: "Bạn ăn sáng lúc mấy giờ?"
          },
          {
            teacherQuestion: "Tôi ăn sáng lúc bảy giờ rưỡi.",
            studentAnswer: "我七点半吃早饭",
            pinyinAnswer: "Wǒ qī diǎn bàn chī zǎofàn",
            vietnameseMeaning: "Tôi ăn sáng lúc bảy giờ rưỡi."
          },
          {
            teacherQuestion: "Bạn lên lớp khi nào?",
            studentAnswer: "你什么时候上课",
            pinyinAnswer: "Nǐ shénme shíhou shàngkè",
            vietnameseMeaning: "Bạn lên lớp khi nào?"
          },
          {
            teacherQuestion: "Tôi học từ 8 giờ sáng đến 12 giờ trưa.",
            studentAnswer: "我从上午八点到十二点上课",
            pinyinAnswer: "Wǒ cóng shàngwǔ bā diǎn dào shí'èr diǎn shàngkè",
            vietnameseMeaning: "Tôi học từ 8 giờ sáng đến 12 giờ trưa."
          },
          {
            teacherQuestion: "Hôm nay là ngày mấy?",
            studentAnswer: "今天几号",
            pinyinAnswer: "Jīntiān jǐ hào",
            vietnameseMeaning: "Hôm nay là ngày mấy?"
          },
          {
            teacherQuestion: "Hôm nay là ngày 28.",
            studentAnswer: "今天二十八号",
            pinyinAnswer: "Jīntiān èrshíbā hào",
            vietnameseMeaning: "Hôm nay là ngày 28."
          },
          {
            teacherQuestion: "Hai mươi tám ngày.",
            studentAnswer: "二十八天",
            pinyinAnswer: "Èrshíbā tiān",
            vietnameseMeaning: "Hai mươi tám ngày."
          },
          {
            teacherQuestion: "Tháng Tám.",
            studentAnswer: "八月",
            pinyinAnswer: "Bā yuè",
            vietnameseMeaning: "Tháng Tám."
          },
          {
            teacherQuestion: "Tám tháng.",
            studentAnswer: "八个月",
            pinyinAnswer: "Bā gè yuè",
            vietnameseMeaning: "Tám tháng."
          },
          {
            teacherQuestion: "Hôm nay là thứ mấy?",
            studentAnswer: "今天星期几",
            pinyinAnswer: "Jīntiān xīngqī jǐ",
            vietnameseMeaning: "Hôm nay là thứ mấy?"
          },
          {
            teacherQuestion: "Hôm nay là thứ Tư.",
            studentAnswer: "今天星期三",
            pinyinAnswer: "Jīntiān xīngqīsān",
            vietnameseMeaning: "Hôm nay là thứ Tư."
          },
          {
            teacherQuestion: "Ngày 25 là Chủ nhật, phải không?",
            studentAnswer: "二十五号是星期天吧",
            pinyinAnswer: "Èrshíwǔ hào shì xīngqītiān ba",
            vietnameseMeaning: "Ngày 25 là Chủ nhật, phải không?"
          },
          {
            teacherQuestion: "Ngày 25 không phải là Chủ nhật.",
            studentAnswer: "二十五号不是星期天",
            pinyinAnswer: "Èrshíwǔ hào bú shì xīngqītiān",
            vietnameseMeaning: "Ngày 25 không phải là Chủ nhật."
          },
          {
            teacherQuestion: "Là thứ Bảy.",
            studentAnswer: "是星期六",
            pinyinAnswer: "Shì xīngqīliù",
            vietnameseMeaning: "Là thứ Bảy."
          },
          {
            teacherQuestion: "Chủ nhật chúng ta đi Di Hòa Viên nhé, thế nào?",
            studentAnswer: "星期天咱们去颐和园怎么样",
            pinyinAnswer: "Xīngqītiān zánmen qù Yíhéyuán zěnmeyàng",
            vietnameseMeaning: "Chủ nhật chúng ta đi Di Hòa Viên nhé, thế nào?"
          },
          {
            teacherQuestion: "Được đấy! Khi nào chúng ta xuất phát?",
            studentAnswer: "好啊.什么时候出发",
            pinyinAnswer: "Hǎo a. Shénme shíhou chūfā",
            vietnameseMeaning: "Được đấy! Khi nào chúng ta xuất phát?"
          },
          {
            teacherQuestion: "Chín giờ sáng, được không?",
            studentAnswer: "上午九点.行吗",
            pinyinAnswer: "Shàngwǔ jiǔ diǎn. Xíng ma",
            vietnameseMeaning: "Chín giờ sáng, được không?"
          },
          {
            teacherQuestion: "Được. Chúng ta gặp nhau lúc mấy giờ?",
            studentAnswer: "行.咱们几点见面",
            pinyinAnswer: "Xíng. Zánmen jǐ diǎn jiànmiàn",
            vietnameseMeaning: "Được. Chúng ta gặp nhau lúc mấy giờ?"
          },
          {
            teacherQuestion: "Chín giờ kém năm phút.",
            studentAnswer: "差五分九点",
            pinyinAnswer: "Chà wǔ fēn jiǔ diǎn",
            vietnameseMeaning: "Chín giờ kém năm phút."
          },
          {
            teacherQuestion: "Chúng ta gặp nhau ở đâu?",
            studentAnswer: "咱们在哪儿见面",
            pinyinAnswer: "Zánmen zài nǎr jiànmiàn",
            vietnameseMeaning: "Chúng ta gặp nhau ở đâu?"
          },
          {
            teacherQuestion: "Tôi đợi bạn ở cổng trường.",
            studentAnswer: "我在学校门口等你",
            pinyinAnswer: "Wǒ zài xuéxiào ménkǒu děng nǐ",
            vietnameseMeaning: "Tôi đợi bạn ở cổng trường."
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Bài 10 Giao tiếp",
        chineseSubtitle: "时间、日期与约会交际",
        pinyinSubtitle: "Shíjiān, rìqī yǔ yuēhuì jiāojì",
        vietnameseSubtitle: "Luyện phản xạ hội thoại hai chiều (11 câu)",
        keyGrammar: "Giáo viên AI đóng vai trò người bản xứ Trung Quốc hỏi theo danh sách câu hỏi trong “ ”. Học sinh trả lời đúng ý nghĩa câu hỏi và đúng ngữ pháp là đạt yêu cầu. Khen “Tốt lắm” hoặc “Rất tốt”. Nếu sai sửa ngữ pháp, sửa phát âm chuẩn Bắc Kinh bằng tiếng Việt.",
        vocabulary: [
          { hanzi: "现在", pinyin: "xiànzài", meaning: "bây giờ" },
          { hanzi: "几点", pinyin: "jǐ diǎn", meaning: "mấy giờ" },
          { hanzi: "早饭", pinyin: "zǎofàn", meaning: "bữa sáng" },
          { hanzi: "什么时候", pinyin: "shénme shíhou", meaning: "khi nào" },
          { hanzi: "上课", pinyin: "shàngkè", meaning: "vào học, lên lớp" },
          { hanzi: "几号", pinyin: "jǐ hào", meaning: "ngày mấy" },
          { hanzi: "星期几", pinyin: "xīngqī jǐ", meaning: "thứ mấy" },
          { hanzi: "星期天", pinyin: "xīngqītiān", meaning: "Chủ nhật" },
          { hanzi: "星期六", pinyin: "xīngqīliù", meaning: "thứ Bảy" },
          { hanzi: "颐和园", pinyin: "Yíhéyuán", meaning: "Di Hòa Viên" },
          { hanzi: "出发", pinyin: "chūfā", meaning: "xuất phát" },
          { hanzi: "行", pinyin: "xíng", meaning: "được" },
          { hanzi: "见面", pinyin: "jiànmiàn", meaning: "gặp mặt" },
          { hanzi: "差", pinyin: "chà", meaning: "kém" },
          { hanzi: "门口", pinyin: "ménkǒu", meaning: "cổng" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "现在几点？",
            pinyinQuestion: "Xiànzài jǐ diǎn?",
            studentAnswer: "现在七点一刻 / 现在八点 / 七点半",
            pinyinAnswer: "Xiànzài qī diǎn yí kè / Xiànzài bā diǎn...",
            vietnameseMeaning: "Bây giờ là mấy giờ? -> Bây giờ là 7 giờ 15 phút / 8 giờ..."
          },
          {
            teacherQuestion: "你几点吃早饭？",
            pinyinQuestion: "Nǐ jǐ diǎn chī zǎofàn?",
            studentAnswer: "我七点半吃早饭 / 七点吃早饭 / 七点一刻",
            pinyinAnswer: "Wǒ qī diǎn bàn chī zǎofàn...",
            vietnameseMeaning: "Bạn ăn sáng lúc mấy giờ? -> Tôi ăn sáng lúc 7 giờ rưỡi..."
          },
          {
            teacherQuestion: "你什么时候上课？",
            pinyinQuestion: "Nǐ shénme shíhou shàngkè?",
            studentAnswer: "我从上午八点到十二点上课 / 上午八点上课",
            pinyinAnswer: "Wǒ cóng shàngwǔ bā diǎn dào shí'èr diǎn shàngkè...",
            vietnameseMeaning: "Bạn lên lớp khi nào? -> Tôi học từ 8 giờ sáng đến 12 giờ trưa..."
          },
          {
            teacherQuestion: "今天几号？",
            pinyinQuestion: "Jīntiān jǐ hào?",
            studentAnswer: "今天二十八号 / 今天二十五号 / 二十八号",
            pinyinAnswer: "Jīntiān èrshíbā hào...",
            vietnameseMeaning: "Hôm nay là ngày mấy? -> Hôm nay là ngày 28..."
          },
          {
            teacherQuestion: "今天星期几？",
            pinyinQuestion: "Jīntiān xīngqī jǐ?",
            studentAnswer: "今天星期三 / 星期三 / 今天星期天",
            pinyinAnswer: "Jīntiān xīngqīsān...",
            vietnameseMeaning: "Hôm nay là thứ mấy? -> Hôm nay là thứ Tư..."
          },
          {
            teacherQuestion: "二十五号是星期天吧？",
            pinyinQuestion: "Èrshíwǔ hào shì xīngqītiān ba?",
            studentAnswer: "二十五号不是星期天，是星期六 / 不是星期天",
            pinyinAnswer: "Èrshíwǔ hào bú shì xīngqītiān, shì xīngqīliù...",
            vietnameseMeaning: "Ngày 25 là Chủ nhật, phải không? -> Ngày 25 không phải Chủ nhật, là thứ Bảy."
          },
          {
            teacherQuestion: "星期天咱们去颐和园怎么样？",
            pinyinQuestion: "Xīngqītiān zánmen qù Yíhéyuán zěnmeyàng?",
            studentAnswer: "好啊 / 太好了 / 很好 / 可以啊",
            pinyinAnswer: "Hǎo a / Tài hǎo le...",
            vietnameseMeaning: "Chủ nhật chúng ta đi Di Hòa Viên nhé, thế nào? -> Được đấy / Tuyệt quá..."
          },
          {
            teacherQuestion: "好啊，什么时候出发？",
            pinyinQuestion: "Hǎo a, shénme shíhou chūfā?",
            studentAnswer: "上午九点出发 / 九点出发 / 上午八点半",
            pinyinAnswer: "Shàngwǔ jiǔ diǎn chūfā...",
            vietnameseMeaning: "Được đấy, khi nào xuất phát? -> Chín giờ sáng xuất phát..."
          },
          {
            teacherQuestion: "上午九点，行吗？",
            pinyinQuestion: "Shàngwǔ jiǔ diǎn, xíng ma?",
            studentAnswer: "行 / 可以 / 好的 / 行啊",
            pinyinAnswer: "Xíng / Kěyǐ / Hǎo de...",
            vietnameseMeaning: "Chín giờ sáng, được không? -> Được / Có thể..."
          },
          {
            teacherQuestion: "咱们几点见面？",
            pinyinQuestion: "Zánmen jǐ diǎn jiànmiàn?",
            studentAnswer: "差五分九点 / 九点 / 八点五十",
            pinyinAnswer: "Chà wǔ fēn jiǔ diǎn...",
            vietnameseMeaning: "Chúng ta gặp nhau lúc mấy giờ? -> Chín giờ kém năm phút..."
          },
          {
            teacherQuestion: "咱们在哪儿见面？",
            pinyinQuestion: "Zánmen zài nǎr jiànmiàn?",
            studentAnswer: "我在学校门口等你 / 在学校门口 / 在宿舍门口",
            pinyinAnswer: "Wǒ zài xuéxiào ménkǒu děng nǐ...",
            vietnameseMeaning: "Chúng ta gặp nhau ở đâu? -> Tôi đợi bạn ở cổng trường..."
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 6,
    internalLessonIndex: 6,
    title: "Nhà hàng & Trải nghiệm",
    chineseTitle: "经历与中国体验",
    pinyin: "Jīnglì yǔ Zhōngguó tǐyàn",
    theme: "Kinh nghiệm đã từng trải qua",
    summary: "Luyện cấu trúc trợ từ động thái 过 diễn tả những việc từng làm: leo Hương Sơn, ăn món ngon Bắc Kinh và học hát bài hát tiếng Trung.",
    grammarPoints: [
      "Động từ + 过: Đã từng trải qua hành động gì đó.",
      "Phủ định: 没 + Động từ + 过 (chưa từng làm).",
      "Cấu trúc 是... 的 nhấn mạnh thời gian, địa điểm, cách thức: 是骑车去的."
    ],
    vocabulary: [
      { hanzi: "去过", pinyin: "qù guò", meaning: "đã từng đi" },
      { hanzi: "风味菜", pinyin: "fēngwèicài", meaning: "món đặc sản" },
      { hanzi: "磁带", pinyin: "cídài", meaning: "băng cát-sét" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "你去过香山吗？",
        pinyinQuestion: "Nǐ qù guò Xiāngshān ma?",
        studentAnswer: "去过，我是上个月骑车去的。",
        pinyinAnswer: "Qù guò, wǒ shì shàng gè yuè qí chē qù de.",
        vietnameseMeaning: "Từng đi rồi, tháng trước tôi đạp xe đi."
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Bài 11 Dịch câu",
        chineseSubtitle: "方位、位置与空间翻译",
        pinyinSubtitle: "Fāngwèi, wèizhi yǔ kōngjiān fānyì",
        vietnameseSubtitle: "Luyện dịch 17 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt phát âm chuẩn, học sinh dịch sang tiếng Trung chuẩn giọng Bắc Kinh",
        vocabulary: [
          { hanzi: "左边", pinyin: "zuǒbian", meaning: "bên trái" },
          { hanzi: "前边", pinyin: "qiánbian", meaning: "phía trước" },
          { hanzi: "桌子", pinyin: "zhuōzi", meaning: "cái bàn" },
          { hanzi: "上边", pinyin: "shàngbian", meaning: "phía trên" },
          { hanzi: "抽屉", pinyin: "chōuti", meaning: "ngăn kéo" },
          { hanzi: "巧克力", pinyin: "qiǎokèlì", meaning: "sô-cô-la" },
          { hanzi: "下边", pinyin: "xiàbian", meaning: "phía dưới" },
          { hanzi: "书包", pinyin: "shūbāo", meaning: "cặp sách" },
          { hanzi: "后边", pinyin: "hòubian", meaning: "phía sau" },
          { hanzi: "附近", pinyin: "fùjìn", meaning: "gần đây" },
          { hanzi: "药店", pinyin: "yàodiàn", meaning: "hiệu thuốc" },
          { hanzi: "对面", pinyin: "duìmiàn", meaning: "đối diện" },
          { hanzi: "银行", pinyin: "yínháng", meaning: "ngân hàng" },
          { hanzi: "旁边", pinyin: "pángbiān", meaning: "bên cạnh" },
          { hanzi: "邮局", pinyin: "yóujú", meaning: "bưu điện" },
          { hanzi: "中间", pinyin: "zhōngjiān", meaning: "ở giữa" },
          { hanzi: "图书馆", pinyin: "túshūguǎn", meaning: "thư viện" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "bên trái bạn là ai?",
            studentAnswer: "你左边是谁",
            pinyinAnswer: "Nǐ zuǒbian shì shéi",
            vietnameseMeaning: "bên trái bạn là ai?"
          },
          {
            teacherQuestion: "Bên trái tôi là anh trai tôi.",
            studentAnswer: "我左边是我哥哥",
            pinyinAnswer: "Wǒ zuǒbian shì wǒ gēge",
            vietnameseMeaning: "Bên trái tôi là anh trai tôi."
          },
          {
            teacherQuestion: "Phía trước bạn là cái gì?",
            studentAnswer: "你前边是什么",
            pinyinAnswer: "Nǐ qiánbian shì shénme",
            vietnameseMeaning: "Phía trước bạn là cái gì?"
          },
          {
            teacherQuestion: "Phía trước tôi là cái bàn.",
            studentAnswer: "我前边是桌子",
            pinyinAnswer: "Wǒ qiánbian shì zhuōzi",
            vietnameseMeaning: "Phía trước tôi là cái bàn."
          },
          {
            teacherQuestion: "Trên bàn có gì?",
            studentAnswer: "桌子上边有什么",
            pinyinAnswer: "Zhuōzi shàngbian yǒu shénme",
            vietnameseMeaning: "Trên bàn có gì?"
          },
          {
            teacherQuestion: "Trên bàn có hai cái bút và một quyển sách.",
            studentAnswer: "桌子上边有两个笔和一本书",
            pinyinAnswer: "Zhuōzi shàngbian yǒu liǎng gè bǐ hé yì běn shū",
            vietnameseMeaning: "Trên bàn có hai cái bút và một quyển sách."
          },
          {
            teacherQuestion: "Trong ngăn kéo có gì?",
            studentAnswer: "抽屉里有什么",
            pinyinAnswer: "Chōuti lǐ yǒu shénme",
            vietnameseMeaning: "Trong ngăn kéo có gì?"
          },
          {
            teacherQuestion: "Trong ngăn kéo có một thanh sô-cô-la.",
            studentAnswer: "抽屉里有一块巧克力",
            pinyinAnswer: "Chōuti lǐ yǒu yí kuài qiǎokèlì",
            vietnameseMeaning: "Trong ngăn kéo có một thanh sô-cô-la."
          },
          {
            teacherQuestion: "Dưới bàn là cái gì?",
            studentAnswer: "桌子下边是什么",
            pinyinAnswer: "Zhuōzi xiàbian shì shénme",
            vietnameseMeaning: "Dưới bàn là cái gì?"
          },
          {
            teacherQuestion: "Dưới bàn là một cái cặp sách.",
            studentAnswer: "桌子下边是一个书包",
            pinyinAnswer: "Zhuōzi xiàbian shì yí gè shūbāo",
            vietnameseMeaning: "Dưới bàn là một cái cặp sách."
          },
          {
            teacherQuestion: "Phía sau bạn là em gái bạn phải không?",
            studentAnswer: "你后边是你妹妹吗",
            pinyinAnswer: "Nǐ hòubian shì nǐ mèimei ma",
            vietnameseMeaning: "Phía sau bạn là em gái bạn phải không?"
          },
          {
            teacherQuestion: "Phía sau tôi không phải là em gái tôi.",
            studentAnswer: "我后边不是我妹妹",
            pinyinAnswer: "Wǒ hòubian bú shì wǒ mèimei",
            vietnameseMeaning: "Phía sau tôi không phải là em gái tôi."
          },
          {
            teacherQuestion: "Gần đây có hiệu thuốc không?",
            studentAnswer: "附近有药店吗",
            pinyinAnswer: "Fùjìn yǒu yàodiàn ma",
            vietnameseMeaning: "Gần đây có hiệu thuốc không?"
          },
          {
            teacherQuestion: "Gần đây có hiệu thuốc.",
            studentAnswer: "附近有药店",
            pinyinAnswer: "Fùjìn yǒu yàodiàn",
            vietnameseMeaning: "Gần đây có hiệu thuốc."
          },
          {
            teacherQuestion: "Đối diện công ty Trường Hải là ngân hàng.",
            studentAnswer: "长海公司对面是银行",
            pinyinAnswer: "Chánghǎi gōngsī duìmiàn shì yínháng",
            vietnameseMeaning: "Đối diện công ty Trường Hải là ngân hàng."
          },
          {
            teacherQuestion: "Bên cạnh ngân hàng là bưu điện.",
            studentAnswer: "银行旁边是邮局",
            pinyinAnswer: "Yínháng pángbiān shì yóujú",
            vietnameseMeaning: "Bên cạnh ngân hàng là bưu điện."
          },
          {
            teacherQuestion: "Bưu điện nằm giữa ngân hàng và thư viện.",
            studentAnswer: "邮局在银行和图书馆中间",
            pinyinAnswer: "Yóujú zài yínháng hé túshūguǎn zhōngjiān",
            vietnameseMeaning: "Bưu điện nằm giữa ngân hàng và thư viện."
          }
        ]
      },
      {
        sectionNumber: 2,
        title: "Bài 11 Giao tiếp",
        chineseSubtitle: "空间、位置与方位交际",
        pinyinSubtitle: "Kōngjiān, wèizhi yǔ fāngwèi jiāojì",
        vietnameseSubtitle: "Luyện phản xạ hội thoại hai chiều (7 câu)",
        keyGrammar: "Giáo viên AI đóng vai trò người bản xứ Trung Quốc hỏi theo danh sách câu hỏi trong “ ”. Học sinh trả lời đúng ý nghĩa câu hỏi và đúng ngữ pháp là đạt yêu cầu. Khen “Tốt lắm” hoặc “Rất tốt”. Nếu sai sửa ngữ pháp, sửa phát âm chuẩn Bắc Kinh bằng tiếng Việt.",
        vocabulary: [
          { hanzi: "左边", pinyin: "zuǒbian", meaning: "bên trái" },
          { hanzi: "前边", pinyin: "qiánbian", meaning: "phía trước" },
          { hanzi: "后边", pinyin: "hòubian", meaning: "phía sau" },
          { hanzi: "桌子", pinyin: "zhuōzi", meaning: "cái bàn" },
          { hanzi: "上边", pinyin: "shàngbian", meaning: "phía trên" },
          { hanzi: "下边", pinyin: "xiàbian", meaning: "phía dưới" },
          { hanzi: "抽屉", pinyin: "chōuti", meaning: "ngăn kéo" },
          { hanzi: "书包", pinyin: "shūbāo", meaning: "cặp sách" },
          { hanzi: "药店", pinyin: "yàodiàn", meaning: "hiệu thuốc" },
          { hanzi: "附近", pinyin: "fùjìn", meaning: "gần đây" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "你左边是谁？",
            pinyinQuestion: "Nǐ zuǒbian shì shéi?",
            studentAnswer: "我左边是我哥哥 / 我朋友 / 我同学",
            pinyinAnswer: "Wǒ zuǒbian shì wǒ gēge...",
            vietnameseMeaning: "Bên trái bạn là ai? -> Bên trái tôi là anh trai tôi / bạn tôi..."
          },
          {
            teacherQuestion: "你前边是什么？",
            pinyinQuestion: "Nǐ qiánbian shì shénme?",
            studentAnswer: "我前边是桌子 / 是黑板 / 是电脑",
            pinyinAnswer: "Wǒ qiánbian shì zhuōzi...",
            vietnameseMeaning: "Phía trước bạn là cái gì? -> Phía trước tôi là cái bàn..."
          },
          {
            teacherQuestion: "桌子上边有什么？",
            pinyinQuestion: "Zhuōzi shàngbian yǒu shénme?",
            studentAnswer: "桌子上边有两个笔和一本书 / 有电脑",
            pinyinAnswer: "Zhuōzi shàngbian yǒu liǎng gè bǐ hé yì běn shū...",
            vietnameseMeaning: "Trên bàn có gì? -> Trên bàn có 2 cái bút và một quyển sách..."
          },
          {
            teacherQuestion: "抽屉里有什么？",
            pinyinQuestion: "Chōuti lǐ yǒu shénme?",
            studentAnswer: "抽屉里有一块巧克力 / 有书 / 没有东西",
            pinyinAnswer: "Chōuti lǐ yǒu yí kuài qiǎokèlì...",
            vietnameseMeaning: "Trong ngăn kéo có gì? -> Trong ngăn kéo có một thanh sô-cô-la..."
          },
          {
            teacherQuestion: "桌子下边是什么？",
            pinyinQuestion: "Zhuōzi xiàbian shì shénme?",
            studentAnswer: "桌子下边是一个书包 / 是书包",
            pinyinAnswer: "Zhuōzi xiàbian shì yí gè shūbāo...",
            vietnameseMeaning: "Dưới bàn là cái gì? -> Dưới bàn là một cái cặp sách..."
          },
          {
            teacherQuestion: "你后边是你妹妹吗？",
            pinyinQuestion: "Nǐ hòubian shì nǐ mèimei ma?",
            studentAnswer: "我后边不是我妹妹 / 是我妹妹 / 是我朋友",
            pinyinAnswer: "Wǒ hòubian bú shì wǒ mèimei...",
            vietnameseMeaning: "Phía sau bạn là em gái bạn phải không? -> Phía sau tôi không phải em gái tôi..."
          },
          {
            teacherQuestion: "附近有药店吗？",
            pinyinQuestion: "Fùjìn yǒu yàodiàn ma?",
            studentAnswer: "附近有药店 / 附近没有药店 / 有",
            pinyinAnswer: "Fùjìn yǒu yàodiàn...",
            vietnameseMeaning: "Gần đây có hiệu thuốc không? -> Gần đây có hiệu thuốc..."
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Bài 12 Dịch câu",
        chineseSubtitle: "买东西与购物翻译",
        pinyinSubtitle: "Mǎi dōngxi yǔ gòuwù fānyì",
        vietnameseSubtitle: "Luyện dịch 29 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt phát âm chuẩn, học sinh dịch sang tiếng Trung chuẩn giọng Bắc Kinh",
        vocabulary: [
          { hanzi: "圆珠笔", pinyin: "yuánzhūbǐ", meaning: "bút bi" },
          { hanzi: "支", pinyin: "zhī", meaning: "chiếc, cây (lượng từ bút)" },
          { hanzi: "红", pinyin: "hóng", meaning: "màu đỏ" },
          { hanzi: "蓝", pinyin: "lán", meaning: "màu xanh lam" },
          { hanzi: "一样一支", pinyin: "yíyàng yì zhī", meaning: "mỗi màu một chiếc" },
          { hanzi: "啤酒", pinyin: "píjiǔ", meaning: "bia" },
          { hanzi: "青岛啤酒", pinyin: "Qīngdǎo píjiǔ", meaning: "bia Thanh Đảo" },
          { hanzi: "瓶", pinyin: "píng", meaning: "chai" },
          { hanzi: "听", pinyin: "tīng", meaning: "lon" },
          { hanzi: "可口可乐", pinyin: "Kěkǒukělè", meaning: "Coca-Cola" },
          { hanzi: "一共", pinyin: "yígòng", meaning: "tổng cộng" },
          { hanzi: "多少钱", pinyin: "duōshao qián", meaning: "bao nhiêu tiền" },
          { hanzi: "块", pinyin: "kuài", meaning: "đồng (tệ)" },
          { hanzi: "毛", pinyin: "máo", meaning: "hào" },
          { hanzi: "零钱", pinyin: "língqián", meaning: "tiền lẻ" },
          { hanzi: "换钱", pinyin: "huàn qián", meaning: "đổi tiền" },
          { hanzi: "找", pinyin: "zhǎo", meaning: "thối lại, trả lại tiền" },
          { hanzi: "橘子", pinyin: "júzi", meaning: "quả cam" },
          { hanzi: "斤", pinyin: "jīn", meaning: "cân (500g)" },
          { hanzi: "甜", pinyin: "tián", meaning: "ngọt" },
          { hanzi: "尝", pinyin: "cháng", meaning: "nếm, thử" },
          { hanzi: "西红柿", pinyin: "xīhóngshì", meaning: "cà chua" },
          { hanzi: "新鲜", pinyin: "xīnxiān", meaning: "tươi mới" },
          { hanzi: "摘", pinyin: "zhāi", meaning: "hái, ngắt" },
          { hanzi: "极了", pinyin: "jíle", meaning: "vô cùng, cực kỳ" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "Tôi mua hai chiếc bút bi.",
            studentAnswer: "我买两支圆珠笔",
            pinyinAnswer: "Wǒ mǎi liǎng zhī yuánzhūbǐ",
            vietnameseMeaning: "Tôi mua hai chiếc bút bi."
          },
          {
            teacherQuestion: "Bạn muốn loại màu đỏ hay màu xanh lam?",
            studentAnswer: "你要红的还是要蓝的",
            pinyinAnswer: "Nǐ yào hóng de háishì yào lán de",
            vietnameseMeaning: "Bạn muốn loại màu đỏ hay màu xanh lam?"
          },
          {
            teacherQuestion: "Mỗi màu một chiếc.",
            studentAnswer: "一样一支",
            pinyinAnswer: "Yíyàng yì zhī",
            vietnameseMeaning: "Mỗi màu một chiếc."
          },
          {
            teacherQuestion: "Bạn còn muốn mua gì nữa không?",
            studentAnswer: "还要别的吗",
            pinyinAnswer: "Hái yào bié de ma",
            vietnameseMeaning: "Bạn còn muốn mua gì nữa không?"
          },
          {
            teacherQuestion: "Không cần nữa.",
            studentAnswer: "不要了",
            pinyinAnswer: "Bú yào le",
            vietnameseMeaning: "Không cần nữa."
          },
          {
            teacherQuestion: "Xin hỏi, bia được bán ở đâu?",
            studentAnswer: "请问.哪儿卖啤酒",
            pinyinAnswer: "Qǐngwèn. Nǎr mài píjiǔ",
            vietnameseMeaning: "Xin hỏi, bia được bán ở đâu?"
          },
          {
            teacherQuestion: "Ở đằng kia có bán.",
            studentAnswer: "那儿卖",
            pinyinAnswer: "Nàr mài",
            vietnameseMeaning: "Ở đằng kia có bán."
          },
          {
            teacherQuestion: "Ở đây có bia Thanh Đảo không?",
            studentAnswer: "有青岛啤酒吗",
            pinyinAnswer: "Yǒu Qīngdǎo píjiǔ ma",
            vietnameseMeaning: "Ở đây có bia Thanh Đảo không?"
          },
          {
            teacherQuestion: "Có. Bạn muốn mấy chai?",
            studentAnswer: "有.要几瓶",
            pinyinAnswer: "Yǒu. Yào jǐ píng",
            vietnameseMeaning: "Có. Bạn muốn mấy chai?"
          },
          {
            teacherQuestion: "Tôi lấy bốn chai, thêm hai lon Coca-Cola nữa.",
            studentAnswer: "要四瓶.再要两听可口可乐",
            pinyinAnswer: "Yào sì píng. Zài yào liǎng tīng Kěkǒukělè",
            vietnameseMeaning: "Tôi lấy bốn chai, thêm hai lon Coca-Cola nữa."
          },
          {
            teacherQuestion: "Tổng cộng bao nhiêu tiền?",
            studentAnswer: "一共多少钱",
            pinyinAnswer: "Yígòng duōshao qián",
            vietnameseMeaning: "Tổng cộng bao nhiêu tiền?"
          },
          {
            teacherQuestion: "Mười chín đồng bốn hào.",
            studentAnswer: "十九块四",
            pinyinAnswer: "Shíjiǔ kuài sì",
            vietnameseMeaning: "Mười chín đồng bốn hào."
          },
          {
            teacherQuestion: "Gửi tiền cho bạn đây.",
            studentAnswer: "给你钱",
            pinyinAnswer: "Gěi nǐ qián",
            vietnameseMeaning: "Gửi tiền cho bạn đây."
          },
          {
            teacherQuestion: "Bạn có tiền lẻ không?",
            studentAnswer: "您有零钱吗",
            pinyinAnswer: "Nín yǒu língqián ma",
            vietnameseMeaning: "Bạn có tiền lẻ không?"
          },
          {
            teacherQuestion: "Không có.",
            studentAnswer: "没有",
            pinyinAnswer: "Méiyǒu",
            vietnameseMeaning: "Không có."
          },
          {
            teacherQuestion: "Bạn đợi tôi một lát nhé.",
            studentAnswer: "你等我一下儿",
            pinyinAnswer: "Nǐ děng wǒ yíxiàr",
            vietnameseMeaning: "Bạn đợi tôi một lát nhé."
          },
          {
            teacherQuestion: "Tôi đi đổi tiền.",
            studentAnswer: "我去换钱",
            pinyinAnswer: "Wǒ qù huàn qián",
            vietnameseMeaning: "Tôi đi đổi tiền."
          },
          {
            teacherQuestion: "Đây là tờ 50 đồng của bạn.",
            studentAnswer: "您这是五十块.",
            pinyinAnswer: "Nín zhè shì wǔshí kuài.",
            vietnameseMeaning: "Đây là tờ 50 đồng của bạn."
          },
          {
            teacherQuestion: "Tôi thối lại bạn 30 đồng 6 hào. Xin đếm lại nhé.",
            studentAnswer: "找您三十块零六毛.请数一下",
            pinyinAnswer: "Zhǎo nín sānshí kuài líng liù máo. Qǐng shǔ yíxià",
            vietnameseMeaning: "Tôi thối lại bạn 30 đồng 6 hào. Xin đếm lại nhé."
          },
          {
            teacherQuestion: "Cam bao nhiêu tiền một cân?",
            studentAnswer: "橘子多少钱一斤",
            pinyinAnswer: "Júzi duōshao qián yì jīn",
            vietnameseMeaning: "Cam bao nhiêu tiền một cân?"
          },
          {
            teacherQuestion: "Loại to 3 đồng một cân.",
            studentAnswer: "大的三块钱一斤",
            pinyinAnswer: "Dà de sān kuài qián yì jīn",
            vietnameseMeaning: "Loại to 3 đồng một cân."
          },
          {
            teacherQuestion: "Loại nhỏ 10 đồng 4 cân.",
            studentAnswer: "小的十块钱四斤",
            pinyinAnswer: "Xiǎo de shí kuài qián sì jīn",
            vietnameseMeaning: "Loại nhỏ 10 đồng 4 cân."
          },
          {
            teacherQuestion: "Có ngọt không?",
            studentAnswer: "甜不甜",
            pinyinAnswer: "Tián bu tián",
            vietnameseMeaning: "Có ngọt không?"
          },
          {
            teacherQuestion: "Mời bạn nếm thử.",
            studentAnswer: "您尝一下儿",
            pinyinAnswer: "Nín cháng yíxiàr",
            vietnameseMeaning: "Mời bạn nếm thử."
          },
          {
            teacherQuestion: "Không ngọt thì không lấy tiền.",
            studentAnswer: "不甜不要钱",
            pinyinAnswer: "Bù tián bú yào qián",
            vietnameseMeaning: "Không ngọt thì không lấy tiền."
          },
          {
            teacherQuestion: "Cà chua bán thế nào?",
            studentAnswer: "西红柿怎么卖",
            pinyinAnswer: "Xīhóngshì zěnme mài",
            vietnameseMeaning: "Cà chua bán thế nào?"
          },
          {
            teacherQuestion: "Một cân một đồng rưỡi.",
            studentAnswer: "一斤一块五",
            pinyinAnswer: "Yì jīn yí kuài wǔ",
            vietnameseMeaning: "Một cân một đồng rưỡi."
          },
          {
            teacherQuestion: "Có tươi không?",
            studentAnswer: "新鲜不新鲜",
            pinyinAnswer: "Xīnxiān bu xīnxiān",
            vietnameseMeaning: "Có tươi không?"
          },
          {
            teacherQuestion: "Đây là cà chua mới hái sáng nay, tươi vô cùng!",
            studentAnswer: "这是今天早上摘的.新鲜极了",
            pinyinAnswer: "Zhè shì jīntiān zǎoshang zhāi de. Xīnxiān jíle",
            vietnameseMeaning: "Đây là cà chua mới hái sáng nay, tươi vô cùng!"
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Bài 12 Giao tiếp",
        chineseSubtitle: "买东西与购物交际",
        pinyinSubtitle: "Mǎi dōngxi yǔ gòuwù jiāojì",
        vietnameseSubtitle: "Luyện phản xạ hội thoại hai chiều (13 câu)",
        keyGrammar: "Giáo viên AI đóng vai trò người bản xứ Trung Quốc hỏi theo danh sách câu hỏi trong “ ”. Học sinh trả lời đúng ý nghĩa câu hỏi và đúng ngữ pháp là đạt yêu cầu. Khen “Tốt lắm” hoặc “Rất tốt”. Nếu sai sửa ngữ pháp, sửa phát âm chuẩn Bắc Kinh bằng tiếng Việt.",
        vocabulary: [
          { hanzi: "买", pinyin: "mǎi", meaning: "mua" },
          { hanzi: "红", pinyin: "hóng", meaning: "màu đỏ" },
          { hanzi: "蓝", pinyin: "lán", meaning: "màu xanh lam" },
          { hanzi: "啤酒", pinyin: "píjiǔ", meaning: "bia" },
          { hanzi: "青岛啤酒", pinyin: "Qīngdǎo píjiǔ", meaning: "bia Thanh Đảo" },
          { hanzi: "瓶", pinyin: "píng", meaning: "chai" },
          { hanzi: "听", pinyin: "tīng", meaning: "lon" },
          { hanzi: "一共", pinyin: "yígòng", meaning: "tổng cộng" },
          { hanzi: "零钱", pinyin: "língqián", meaning: "tiền lẻ" },
          { hanzi: "橘子", pinyin: "júzi", meaning: "quả cam" },
          { hanzi: "斤", pinyin: "jīn", meaning: "cân (500g)" },
          { hanzi: "甜", pinyin: "tián", meaning: "ngọt" },
          { hanzi: "尝", pinyin: "cháng", meaning: "nếm, thử" },
          { hanzi: "西红柿", pinyin: "xīhóngshì", meaning: "cà chua" },
          { hanzi: "新鲜", pinyin: "xīnxiān", meaning: "tươi mới" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "你要买什么？",
            pinyinQuestion: "Nǐ yào mǎi shénme?",
            studentAnswer: "我买两支圆珠笔 / 我要买书 / 我买水果 / 我要买苹果...",
            pinyinAnswer: "Wǒ mǎi liǎng zhī yuánzhūbǐ...",
            vietnameseMeaning: "Bạn muốn mua gì? -> Tôi mua 2 cây bút bi / Tôi muốn mua sách..."
          },
          {
            teacherQuestion: "你要红的还是要蓝的？",
            pinyinQuestion: "Nǐ yào hóng de háishì yào lán de?",
            studentAnswer: "我要红的 / 我要蓝的 / 一样一支 / 都要...",
            pinyinAnswer: "Wǒ yào hóng de / Yíyàng yì zhī...",
            vietnameseMeaning: "Bạn muốn loại màu đỏ hay màu xanh lam? -> Tôi lấy màu đỏ / Mỗi màu 1 cây..."
          },
          {
            teacherQuestion: "还要别的吗？",
            pinyinQuestion: "Hái yào bié de ma?",
            studentAnswer: "不要了 / 还要别的 / 再要两听可乐 / 不用了...",
            pinyinAnswer: "Bú yào le / Hái yào bié de...",
            vietnameseMeaning: "Còn muốn mua gì nữa không? -> Không cần nữa / Lấy thêm 2 lon Coca..."
          },
          {
            teacherQuestion: "请问，哪儿卖啤酒？",
            pinyinQuestion: "Qǐngwèn, nǎr mài píjiǔ?",
            studentAnswer: "那儿卖 / 商店卖 / 超市卖 / 前边卖...",
            pinyinAnswer: "Nàr mài...",
            vietnameseMeaning: "Xin hỏi, bia được bán ở đâu? -> Ở đằng kia có bán / Ở siêu thị..."
          },
          {
            teacherQuestion: "有青岛啤酒吗？",
            pinyinQuestion: "Yǒu Qīngdǎo píjiǔ ma?",
            studentAnswer: "有 / 没有 / 有青岛啤酒...",
            pinyinAnswer: "Yǒu / Méiyǒu...",
            vietnameseMeaning: "Có bia Thanh Đảo không? -> Có / Không có..."
          },
          {
            teacherQuestion: "要几瓶？",
            pinyinQuestion: "Yào jǐ píng?",
            studentAnswer: "要四瓶 / 要两瓶 / 要一瓶 / 四瓶...",
            pinyinAnswer: "Yào sì píng...",
            vietnameseMeaning: "Lấy mấy chai? -> Lấy 4 chai / 2 chai..."
          },
          {
            teacherQuestion: "一共多少钱？",
            pinyinQuestion: "Yígòng duōshao qián?",
            studentAnswer: "一共十九块四 / 二十块 / 一共五十块...",
            pinyinAnswer: "Yígòng shíjiǔ kuài sì...",
            vietnameseMeaning: "Tổng cộng bao nhiêu tiền? -> Tổng cộng 19 đồng 4 hào..."
          },
          {
            teacherQuestion: "您有零钱吗？",
            pinyinQuestion: "Nín yǒu língqián ma?",
            studentAnswer: "没有 / 有 / 我有零钱 / 没有零钱...",
            pinyinAnswer: "Méiyǒu / Yǒu...",
            vietnameseMeaning: "Bạn có tiền lẻ không? -> Không có / Có..."
          },
          {
            teacherQuestion: "橘子多少钱一斤？",
            pinyinQuestion: "Júzi duōshao qián yì jīn?",
            studentAnswer: "大的三块钱一斤，小的十块钱四斤 / 三块钱一斤...",
            pinyinAnswer: "Dà de sān kuài qián yì jīn...",
            vietnameseMeaning: "Cam bao nhiêu tiền một cân? -> Loại to 3 đồng một cân..."
          },
          {
            teacherQuestion: "甜不甜？",
            pinyinQuestion: "Tián bu tián?",
            studentAnswer: "很甜 / 甜 / 不太甜 / 不甜不要钱...",
            pinyinAnswer: "Hěn tián / Tián...",
            vietnameseMeaning: "Có ngọt không? -> Rất ngọt / Không ngọt không lấy tiền..."
          },
          {
            teacherQuestion: "您尝一下儿。",
            pinyinQuestion: "Nín cháng yíxiàr.",
            studentAnswer: "好的，我尝一下 / 谢谢 / 挺甜的...",
            pinyinAnswer: "Hǎo de, wǒ cháng yíxià...",
            vietnameseMeaning: "Mời bạn nếm thử. -> Được, để tôi nếm thử / Cảm ơn, khá ngọt..."
          },
          {
            teacherQuestion: "西红柿怎么卖？",
            pinyinQuestion: "Xīhóngshì zěnme mài?",
            studentAnswer: "一斤一块五 / 两块钱一斤 / 一块五一斤...",
            pinyinAnswer: "Yì jīn yí kuài wǔ...",
            vietnameseMeaning: "Cà chua bán thế nào? -> Một cân một đồng rưỡi..."
          },
          {
            teacherQuestion: "新鲜不新鲜？",
            pinyinQuestion: "Xīnxiān bu xīnxiān?",
            studentAnswer: "这是今天早上摘的，新鲜极了 / 很新鲜 / 非常新鲜...",
            pinyinAnswer: "Zhè shì jīntiān zǎoshang zhāi de, xīnxiān jíle...",
            vietnameseMeaning: "Có tươi không? -> Đây là cà chua mới hái sáng nay, tươi vô cùng!..."
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 7,
    internalLessonIndex: 7,
    title: "Miêu tả Trạng thái",
    chineseTitle: "存在句与状态描写",
    pinyin: "Cúnzài jù yǔ zhuàngtài miáoxiě",
    theme: "Trạng thái tồn tại duy trì",
    summary: "Luyện câu vị ngữ động từ biểu thị sự tồn tại với trợ từ 着 (cửa mở, hàng hóa ngay ngắn, mèo nằm ngủ bên bậu cửa sổ).",
    grammarPoints: [
      "Vị trí + Động từ + 着 + Danh từ: Chỉ trạng thái đang duy trì (门开着, 货架上摆着...).",
      "Hình dung từ trùng điệp: 整整齐齐, 漂漂亮亮.",
      "Động tác đi kèm: 边... 边... hoặc V1 + 着 + V2 (听着音乐看书)."
    ],
    vocabulary: [
      { hanzi: "书架", pinyin: "shūjià", meaning: "kệ sách" },
      { hanzi: "货架", pinyin: "huòjià", meaning: "kệ hàng" },
      { hanzi: "整齐", pinyin: "zhěngqí", meaning: "ngay ngắn" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "门开着吗？",
        pinyinQuestion: "Mén kāi zhe ma?",
        studentAnswer: "门开着，电视也开着。",
        pinyinAnswer: "Mén kāi zhe, diànshì yě kāi zhe.",
        vietnameseMeaning: "Cửa đang mở, TV cũng đang bật."
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Bài 13 Dịch câu",
        chineseSubtitle: "翻译句子",
        pinyinSubtitle: "Fānyì jùzi",
        vietnameseSubtitle: "Luyện dịch 25 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói tiếng Việt, học sinh dịch sang tiếng Trung chuẩn Bắc Kinh",
        dialogueHighlights: [
          { teacherQuestion: "Tôi muốn mua một chiếc máy ghi âm nhỏ.", studentAnswer: "我想买个小录音机", pinyinAnswer: "Wǒ xiǎng mǎi gè xiǎo lùyīnjī", vietnameseMeaning: "Tôi muốn mua một chiếc máy ghi âm nhỏ." },
          { teacherQuestion: "Ông tư vấn giúp cho tôi.", studentAnswer: "您给我参谋参谋", pinyinAnswer: "Nín gěi wǒ cānmóu cānmou", vietnameseMeaning: "Ông tư vấn giúp cho tôi." },
          { teacherQuestion: "Ông muốn mua loại bao nhiêu tiền?", studentAnswer: "您想买多少钱的", pinyinAnswer: "Nín xiǎng mǎi duōshao qián de", vietnameseMeaning: "Ông muốn mua loại bao nhiêu tiền?" },
          { teacherQuestion: "khoảng 200 đồng.", studentAnswer: "二百块左右的", pinyinAnswer: "Èrbǎi kuài zuǒyòu de", vietnameseMeaning: "khoảng 200 đồng." },
          { teacherQuestion: "Ông xem nhãn hiệu này.", studentAnswer: "您看看这个牌子的", pinyinAnswer: "Nín kànkan zhè ge páizi de", vietnameseMeaning: "Ông xem nhãn hiệu này." },
          { teacherQuestion: "Chất lượng vừa tốt, giá cả lại vừa rẻ.", studentAnswer: "质量又好.价钱又便宜", pinyinAnswer: "Zhìliàng yòu hǎo, jiàqian yòu piányi", vietnameseMeaning: "Chất lượng vừa tốt, giá cả lại vừa rẻ." },
          { teacherQuestion: "Kiểu dáng cũng khá đẹp.", studentAnswer: "样子也挺好看", pinyinAnswer: "Yàngzi yě tǐng hǎokàn", vietnameseMeaning: "Kiểu dáng cũng khá đẹp." },
          { teacherQuestion: "Đôi giày này là cỡ bao nhiêu?", studentAnswer: "这双鞋是多大号的", pinyinAnswer: "Zhè shuāng xié shì duō dà hào de", vietnameseMeaning: "Đôi giày này là cỡ bao nhiêu?" },
          { teacherQuestion: "Cỡ 25.", studentAnswer: "25号的", pinyinAnswer: "Èrshíwǔ hào de", vietnameseMeaning: "Cỡ 25." },
          { teacherQuestion: "Tôi có thể thử được không?", studentAnswer: "我可以试试吗", pinyinAnswer: "Wǒ kěyǐ shìshi ma", vietnameseMeaning: "Tôi có thể thử được không?" },
          { teacherQuestion: "Được.", studentAnswer: "可以", pinyinAnswer: "Kěyǐ", vietnameseMeaning: "Được." },
          { teacherQuestion: "Đôi này hơi nhỏ.", studentAnswer: "这双有点儿小", pinyinAnswer: "Zhè shuāng yǒudiǎnr xiǎo", vietnameseMeaning: "Đôi này hơi nhỏ." },
          { teacherQuestion: "Có đôi nào lớn hơn một chút không?", studentAnswer: "有大一点儿的吗", pinyinAnswer: "Yǒu dà yìdiǎnr de ma", vietnameseMeaning: "Có đôi nào lớn hơn một chút không?" },
          { teacherQuestion: "Có. Ông thử lại cỡ số 25.", studentAnswer: "有.您再试试25号的", pinyinAnswer: "Yǒu, nín zài shìshi èrshíwǔ hào de", vietnameseMeaning: "Có. Ông thử lại cỡ số 25." },
          { teacherQuestion: "Đôi này không to cũng không nhỏ, rất vừa chân.", studentAnswer: "这双不大也不小.挺合适", pinyinAnswer: "Zhè shuāng bú dà yě bù xiǎo, tǐng héshì", vietnameseMeaning: "Đôi này không to cũng không nhỏ, rất vừa chân." },
          { teacherQuestion: "Ông muốn mua gì?", studentAnswer: "您想买点什么", pinyinAnswer: "Nín xiǎng mǎi diǎnr shénme", vietnameseMeaning: "Ông muốn mua gì?" },
          { teacherQuestion: "Tôi muốn xem chiếc áo sơ mi lụa trắng kia.", studentAnswer: "我看看那件白的真丝衬衣", pinyinAnswer: "Wǒ kànkan nà jiàn bái de zhēnsī chènyī", vietnameseMeaning: "Tôi muốn xem chiếc áo sơ mi lụa trắng kia." },
          { teacherQuestion: "Có màu nào khác không?", studentAnswer: "有别的颜色的吗", pinyinAnswer: "Yǒu bié de yánsè de ma", vietnameseMeaning: "Có màu nào khác không?" },
          { teacherQuestion: "Không có, chỉ có màu này thôi.", studentAnswer: "没有.只有这一种颜色", pinyinAnswer: "Méiyǒu, zhǐ yǒu zhè yì zhǒng yánsè", vietnameseMeaning: "Không có, chỉ có màu này thôi." },
          { teacherQuestion: "Một chiếc bao nhiêu tiền?", studentAnswer: "多少钱一件", pinyinAnswer: "Duōshao qián yí jiàn", vietnameseMeaning: "Một chiếc bao nhiêu tiền?" },
          { teacherQuestion: "180 đồng.", studentAnswer: "一百八", pinyinAnswer: "Yìbǎi bā", vietnameseMeaning: "180 đồng." },
          { teacherQuestion: "Đắt quá, bớt chút đi!", studentAnswer: "太贵了.便宜点儿吧", pinyinAnswer: "Tài guì le, piányi diǎnr ba", vietnameseMeaning: "Đắt quá, bớt chút đi!" },
          { teacherQuestion: "Ông/bà trả 160 đồng nhé.", studentAnswer: "您给一百六吧", pinyinAnswer: "Nín gěi yìbǎi liù ba", vietnameseMeaning: "Ông/bà trả 160 đồng nhé." },
          { teacherQuestion: "Bớt thêm chút nữa đi, 150 đồng thì thế nào?", studentAnswer: "再便宜点儿.一百五怎么样", pinyinAnswer: "Zài piányi diǎnr, yìbǎi wǔ zěnmeyàng", vietnameseMeaning: "Bớt thêm chút nữa đi, 150 đồng thì thế nào?" },
          { teacherQuestion: "Được.", studentAnswer: "行", pinyinAnswer: "Xíng", vietnameseMeaning: "Được." }
        ]
      },
      {
        sectionNumber: 2,
        title: "Bài 13 Giao tiếp",
        chineseSubtitle: "情景对话",
        pinyinSubtitle: "Qíngjǐng duìhuà",
        vietnameseSubtitle: "Luyện phản xạ 10 câu giao tiếp hai chiều",
        keyGrammar: "Giáo viên AI hỏi tiếng Trung, học sinh trả lời phản xạ tự nhiên",
        dialogueHighlights: [
          {
            teacherQuestion: "你想买什么？",
            pinyinQuestion: "Nǐ xiǎng mǎi shénme?",
            studentAnswer: "我想买个小录音机 / 我想买双鞋...",
            pinyinAnswer: "Wǒ xiǎng mǎi gè xiǎo lùyīnjī...",
            vietnameseMeaning: "Bạn muốn mua gì? -> Tôi muốn mua chiếc máy ghi âm nhỏ / mua giày..."
          },
          {
            teacherQuestion: "你想买多少钱左右的？",
            pinyinQuestion: "Nǐ xiǎng mǎi duōshao qián zuǒyòu de?",
            studentAnswer: "二百块左右的 / 一百块左右...",
            pinyinAnswer: "Èrbǎi kuài zuǒyòu de...",
            vietnameseMeaning: "Bạn muốn mua loại tầm bao nhiêu tiền? -> Khoảng 200 đồng..."
          },
          {
            teacherQuestion: "这双鞋，我可以试试吗",
            pinyinQuestion: "Zhè shuāng xié, wǒ kěyǐ shìshi ma?",
            studentAnswer: "可以 / 当然可以 / 您试试吧...",
            pinyinAnswer: "Kěyǐ / Dāngrán kěyǐ...",
            vietnameseMeaning: "Đôi giày này, tôi có thể thử được không? -> Được / Đương nhiên được..."
          },
          {
            teacherQuestion: "这双鞋是多大号的？",
            pinyinQuestion: "Zhè shuāng xié shì duō dà hào de?",
            studentAnswer: "25号的 / 40号的...",
            pinyinAnswer: "Èrshíwǔ hào de...",
            vietnameseMeaning: "Đôi giày này là cỡ bao nhiêu? -> Cỡ 25 / Cỡ 40..."
          },
          {
            teacherQuestion: "有点儿小。有大一点儿的吗？",
            pinyinQuestion: "Yǒudiǎnr xiǎo. Yǒu dà yìdiǎnr de ma?",
            studentAnswer: "有，您再试试25号的 / 没有 / 有...",
            pinyinAnswer: "Yǒu, nín zài shìshi èrshíwǔ hào de...",
            vietnameseMeaning: "Hơi nhỏ một chút. Có đôi to hơn một chút không? -> Có, bạn thử cỡ 25..."
          },
          {
            teacherQuestion: "我看看那件白的真丝衬衣吗？",
            pinyinQuestion: "Wǒ kànkan nà jiàn bái de zhēnsī chènyī ma?",
            studentAnswer: "可以 / 好的，您看吧 / 当然可以...",
            pinyinAnswer: "Kěyǐ / Hǎo de, nín kàn ba...",
            vietnameseMeaning: "Tôi xem chiếc áo sơ mi lụa trắng kia được không? -> Được chứ, mời bạn xem..."
          },
          {
            teacherQuestion: "你有别的颜色的吗？",
            pinyinQuestion: "Nǐ yǒu bié de yánsè de ma?",
            studentAnswer: "没有，只有这一种颜色 / 有红色的...",
            pinyinAnswer: "Méiyǒu, zhǐ yǒu zhè yì zhǒng yánsè...",
            vietnameseMeaning: "Bạn có màu khác không? -> Không có, chỉ có màu này thôi / Có màu đỏ..."
          },
          {
            teacherQuestion: "多少钱一件？",
            pinyinQuestion: "Duōshao qián yí jiàn?",
            studentAnswer: "一百八一件 / 一百八 / 两百块...",
            pinyinAnswer: "Yìbǎi bā yí jiàn...",
            vietnameseMeaning: "Bao nhiêu tiền một chiếc? -> 180 đồng một chiếc..."
          },
          {
            teacherQuestion: "太贵了.便宜点儿吧？",
            pinyinQuestion: "Tài guì le. Piányi diǎnr ba?",
            studentAnswer: "您给一百六吧 / 最便宜一百七...",
            pinyinAnswer: "Nín gěi yìbǎi liù ba...",
            vietnameseMeaning: "Đắt quá, bớt chút đi! -> Bạn trả 160 đồng nhé / Rẻ nhất 170..."
          },
          {
            teacherQuestion: "还有贵.再便宜一点儿吧？",
            pinyinQuestion: "Hái yóu guì. Zài piányi yìdiǎnr ba?",
            studentAnswer: "再便宜点儿，一百五怎么样 / 行，一百五吧...",
            pinyinAnswer: "Zài piányi diǎnr, yìbǎi wǔ zěnmeyàng...",
            vietnameseMeaning: "Vẫn đắt, bớt thêm chút nữa đi? -> Bớt chút nữa, 150 đồng thế nào? / Được, 150 nhé..."
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Bài 14 Dịch câu",
        chineseSubtitle: "翻译句子",
        pinyinSubtitle: "Fānyì jùzi",
        vietnameseSubtitle: "Luyện dịch 24 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói câu tiếng Việt (tiếng việt phát âm chuẩn). Yêu cầu Học sinh trả lời câu dịch đúng ý nghĩa: dịch câu tiếng Việt của giáo viên AI sang tiếng Trung.",
        vocabulary: [
          { hanzi: "四川菜", pinyin: "Sìchuāncài", meaning: "món ăn Tứ Xuyên" },
          { hanzi: "尝", pinyin: "cháng", meaning: "nếm, thử" },
          { hanzi: "菜单", pinyin: "càidān", meaning: "thực đơn" },
          { hanzi: "点菜", pinyin: "diǎn cài", meaning: "gọi món" },
          { hanzi: "鱼香肉丝", pinyin: "yúxiāng ròusī", meaning: "thịt xào vị cá" },
          { hanzi: "麻婆豆腐", pinyin: "mápó dòufu", meaning: "đậu phụ sốt Tứ Xuyên (Ma Po)" },
          { hanzi: "酸辣汤", pinyin: "suānlàtāng", meaning: "canh chua cay" },
          { hanzi: "饮料", pinyin: "yǐnliào", meaning: "đồ uống" },
          { hanzi: "壶", pinyin: "hú", meaning: "ấm (trà)" },
          { hanzi: "请稍等", pinyin: "qǐng shāoděng", meaning: "xin vui lòng đợi một lát" },
          { hanzi: "油", pinyin: "yóu", meaning: "dầu mỡ" },
          { hanzi: "韩国菜", pinyin: "Hánguócài", meaning: "món Hàn Quốc" },
          { hanzi: "辣", pinyin: "là", meaning: "cay" },
          { hanzi: "酸", pinyin: "suān", meaning: "chua" },
          { hanzi: "咸", pinyin: "xián", meaning: "mặn" },
          { hanzi: "苦", pinyin: "kǔ", meaning: "đắng" },
          { hanzi: "甜", pinyin: "tián", meaning: "ngọt" },
          { hanzi: "结帐", pinyin: "jiézhàng", meaning: "tính tiền, thanh toán" },
          { hanzi: "餐巾纸", pinyin: "cānjīnzhǐ", meaning: "khăn ăn giấy" },
          { hanzi: "请客", pinyin: "qǐngkè", meaning: "mời khách, khao" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "Nghe nói món ăn Tứ Xuyên rất ngon.",
            studentAnswer: "听说四川菜很好吃",
            pinyinAnswer: "Tīngshuō Sìchuāncài hěn hǎochī",
            vietnameseMeaning: "Nghe nói món ăn Tứ Xuyên rất ngon."
          },
          {
            teacherQuestion: "Chúng ta đi ăn thử nhé, được không?",
            studentAnswer: "咱们去尝尝好吗",
            pinyinAnswer: "Zánmen qù chángchang hǎo ma",
            vietnameseMeaning: "Chúng ta đi ăn thử nhé, được không?"
          },
          {
            teacherQuestion: "Được đấy! Khi nào đi?",
            studentAnswer: "好啊!什么时候去",
            pinyinAnswer: "Hǎo a! Shénme shíhou qù",
            vietnameseMeaning: "Được đấy! Khi nào đi?"
          },
          {
            teacherQuestion: "Tối nay thì thế nào?",
            studentAnswer: "今天晚上怎么样",
            pinyinAnswer: "Jīntiān wǎnshang zěnmeyàng",
            vietnameseMeaning: "Tối nay thì thế nào?"
          },
          {
            teacherQuestion: "Tối nay tôi có việc. Trưa mai được không?",
            studentAnswer: "今天晚上我有事.明天中午好吗",
            pinyinAnswer: "Jīntiān wǎnshang wǒ yǒushì. Míngtiān zhōngwǔ hǎo ma",
            vietnameseMeaning: "Tối nay tôi có việc. Trưa mai được không?"
          },
          {
            teacherQuestion: "Được.",
            studentAnswer: "好",
            pinyinAnswer: "Hǎo",
            vietnameseMeaning: "Được."
          },
          {
            teacherQuestion: "Đây là thực đơn, mời gọi món.",
            studentAnswer: "这是菜单.请点菜",
            pinyinAnswer: "Zhè shì càidān. Qǐng diǎn cài",
            vietnameseMeaning: "Đây là thực đơn, mời gọi món."
          },
          {
            teacherQuestion: "Cho một phần thịt xào vị cá và một phần đậu phụ sốt.",
            studentAnswer: "来一个鱼香肉丝.一个麻婆豆腐",
            pinyinAnswer: "Lái yí gè yúxiāng ròusī. Yí gè mápó dòufu",
            vietnameseMeaning: "Cho một phần thịt xào vị cá và một phần đậu phụ sốt."
          },
          {
            teacherQuestion: "Hai bát cơm và một bát canh chua cay.",
            studentAnswer: "两碗米饭.一个酸辣汤",
            pinyinAnswer: "Liǎng wǎn mǐfàn. Yí gè suānlàtāng",
            vietnameseMeaning: "Hai bát cơm và một bát canh chua cay."
          },
          {
            teacherQuestion: "Bạn muốn uống gì?",
            studentAnswer: "要什么饮料",
            pinyinAnswer: "Yào shénme yǐnliào",
            vietnameseMeaning: "Bạn muốn uống gì?"
          },
          {
            teacherQuestion: "Cho một ấm trà.",
            studentAnswer: "来一壶茶",
            pinyinAnswer: "Lái yì hú chá",
            vietnameseMeaning: "Cho một ấm trà."
          },
          {
            teacherQuestion: "Xin vui lòng đợi một lát.",
            studentAnswer: "请稍等",
            pinyinAnswer: "Qǐng shāoděng",
            vietnameseMeaning: "Xin vui lòng đợi một lát."
          },
          {
            teacherQuestion: "Bạn thấy món ăn Trung Quốc có ngon không?",
            studentAnswer: "你觉得中国菜好吃吗",
            pinyinAnswer: "Nǐ juéde Zhōngguócài hǎochī ma",
            vietnameseMeaning: "Bạn thấy món ăn Trung Quốc có ngon không?"
          },
          {
            teacherQuestion: "Ngon thì đúng là ngon, nhưng nhiều dầu quá.",
            studentAnswer: "好吃是好吃.不过油太多",
            pinyinAnswer: "Hǎochī shì hǎochī. Búguò yóu tài duō",
            vietnameseMeaning: "Ngon thì đúng là ngon, nhưng nhiều dầu quá."
          },
          {
            teacherQuestion: "Bạn thích ăn món gì?",
            studentAnswer: "你喜欢吃什么菜",
            pinyinAnswer: "Nǐ xǐhuan chī shénme cài",
            vietnameseMeaning: "Bạn thích ăn món gì?"
          },
          {
            teacherQuestion: "Tôi thích ăn món Hàn Quốc nhất.",
            studentAnswer: "我最喜欢吃韩国菜",
            pinyinAnswer: "Wǒ zuì xǐhuan chī Hánguócài",
            vietnameseMeaning: "Tôi thích ăn món Hàn Quốc nhất."
          },
          {
            teacherQuestion: "Tôi thích ăn đồ cay, còn bạn?",
            studentAnswer: "我喜欢吃辣的.你呢",
            pinyinAnswer: "Wǒ xǐhuan chī là de. Nǐ ne",
            vietnameseMeaning: "Tôi thích ăn đồ cay, còn bạn?"
          },
          {
            teacherQuestion: "Tôi à! Tôi thích ăn cả đồ chua, cay, mặn và đắng.",
            studentAnswer: "我呀!酸的.拉的.咸的.苦的都喜欢吃",
            pinyinAnswer: "Wǒ ya! Suān de, là de, xián de, kǔ de dōu xǐhuan chī",
            vietnameseMeaning: "Tôi à! Tôi thích ăn cả đồ chua, cay, mặn và đắng."
          },
          {
            teacherQuestion: "Chỉ là tôi không thích ăn đồ ngọt thôi.",
            studentAnswer: "就是不喜欢吃甜的",
            pinyinAnswer: "Jiùshì bù xǐhuan chī tián de",
            vietnameseMeaning: "Chỉ là tôi không thích ăn đồ ngọt thôi."
          },
          {
            teacherQuestion: "Cô phục vụ ơi, tính tiền!",
            studentAnswer: "小姐.结帐",
            pinyinAnswer: "Xiǎojiě. Jiézhàng",
            vietnameseMeaning: "Cô phục vụ ơi, tính tiền!"
          },
          {
            teacherQuestion: "Cho chúng tôi thêm hai tờ khăn ăn nữa.",
            studentAnswer: "再给我们两张餐巾纸",
            pinyinAnswer: "Zài gěi wǒmen liǎng zhāng cānjīnzhǐ",
            vietnameseMeaning: "Cho chúng tôi thêm hai tờ khăn ăn nữa."
          },
          {
            teacherQuestion: "Để tôi trả tiền.",
            studentAnswer: "我来付钱.",
            pinyinAnswer: "Wǒ lái fù qián.",
            vietnameseMeaning: "Để tôi trả tiền."
          },
          {
            teacherQuestion: "Hôm nay tôi mời.",
            studentAnswer: "今天我请客",
            pinyinAnswer: "Jīntiān wǒ qǐngkè",
            vietnameseMeaning: "Hôm nay tôi mời."
          },
          {
            teacherQuestion: "Được. Lần sau tôi sẽ mời bạn ăn món Hàn Quốc.",
            studentAnswer: "好.以后我请你吃韩国菜",
            pinyinAnswer: "Hǎo. Yǐhòu wǒ qǐng nǐ chī Hánguócài",
            vietnameseMeaning: "Được. Lần sau tôi sẽ mời bạn ăn món Hàn Quốc."
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Bài 14 Giao tiếp",
        chineseSubtitle: "餐饮与点菜情景交际",
        pinyinSubtitle: "Cānyǐn yǔ diǎncài qíngjǐng jiāojì",
        vietnameseSubtitle: "Luyện phản xạ 13 câu giao tiếp hai chiều",
        keyGrammar: "Giáo viên AI nói hiểu tiếng Trung và tiếng việt phát âm chuẩn. Giáo viên AI hỏi (chỉ hỏi theo nội dung trong “ ” ) và Học sinh trả lời theo đúng ý nghĩa của câu là đạt yêu cầu. Luyện phản xạ hội thoại hai chiều.",
        vocabulary: [
          { hanzi: "四川菜", pinyin: "Sìchuāncài", meaning: "món ăn Tứ Xuyên" },
          { hanzi: "尝", pinyin: "cháng", meaning: "nếm, ăn thử" },
          { hanzi: "菜单", pinyin: "càidān", meaning: "thực đơn" },
          { hanzi: "点菜", pinyin: "diǎn cài", meaning: "gọi món" },
          { hanzi: "饮料", pinyin: "yǐnliào", meaning: "đồ uống" },
          { hanzi: "韩国菜", pinyin: "Hánguócài", meaning: "món Hàn Quốc" },
          { hanzi: "结账", pinyin: "jiézhàng", meaning: "tính tiền" },
          { hanzi: "付钱", pinyin: "fù qián", meaning: "trả tiền" },
          { hanzi: "请客", pinyin: "qǐngkè", meaning: "mời khách, khao" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "听说四川菜很好吃，咱们去尝尝好吗？",
            pinyinQuestion: "Tīngshuō Sìchuāncài hěn hǎochī, zánmen qù chángchang hǎo ma?",
            studentAnswer: "好啊！什么时候去？ / 好啊，咱们去尝尝 / 可以 / 行...",
            pinyinAnswer: "Hǎo a! Shénme shíhou qù...",
            vietnameseMeaning: "Nghe nói món ăn Tứ Xuyên rất ngon, chúng mình đi ăn thử nhé được không? -> Được đấy! Khi nào đi?"
          },
          {
            teacherQuestion: "今天晚上怎么样？",
            pinyinQuestion: "Jīntiān wǎnshang zěnmeyàng?",
            studentAnswer: "今天晚上我有事，明天中午好吗？ / 行 / 可以 / 好啊...",
            pinyinAnswer: "Jīntiān wǎnshang wǒ yǒushì, míngtiān zhōngwǔ hǎo ma...",
            vietnameseMeaning: "Tối nay thì thế nào? -> Tối nay tôi có việc, trưa mai được không? / Được..."
          },
          {
            teacherQuestion: "明天中午可以吗？",
            pinyinQuestion: "Míngtiān zhōngwǔ kěyǐ ma?",
            studentAnswer: "可以 / 行 / 好 / 没问题...",
            pinyinAnswer: "Kěyǐ / Xíng / Hǎo...",
            vietnameseMeaning: "Trưa mai được không? -> Được / Được chứ / Không vấn đề..."
          },
          {
            teacherQuestion: "这是菜单，请点菜。",
            pinyinQuestion: "Zhè shì càidān, qǐng diǎn cài.",
            studentAnswer: "来一个鱼香肉丝，一个麻婆豆腐 / 我看看菜单 / 来一个宫保鸡丁...",
            pinyinAnswer: "Lái yí gè yúxiāng ròusī, yí gè mápó dòufu...",
            vietnameseMeaning: "Đây là thực đơn, mời gọi món. -> Cho 1 phần thịt xào vị cá, 1 phần đậu phụ sốt..."
          },
          {
            teacherQuestion: "还要什么菜？",
            pinyinQuestion: "Hái yào shénme cài?",
            studentAnswer: "两碗米饭，一个酸辣汤 / 不要了 / 还要一个汤...",
            pinyinAnswer: "Liǎng wǎn mǐfàn, yí gè suānlàtāng...",
            vietnameseMeaning: "Còn muốn thêm món gì nữa không? -> Hai bát cơm, một bát canh chua cay..."
          },
          {
            teacherQuestion: "要什么饮料？",
            pinyinQuestion: "Yào shénme yǐnliào?",
            studentAnswer: "来一壶茶 / 要啤酒 / 要可乐 / 不要饮料...",
            pinyinAnswer: "Lái yì hú chá / Yào píjiǔ...",
            vietnameseMeaning: "Muốn đồ uống gì? -> Cho một ấm trà / Lấy bia / Lấy coca..."
          },
          {
            teacherQuestion: "你觉得中国菜好吃吗？",
            pinyinQuestion: "Nǐ juéde Zhōngguócài hǎochī ma?",
            studentAnswer: "好吃是好吃，不过油太多 / 很好吃 / 非常好吃 / 挺好吃的...",
            pinyinAnswer: "Hǎochī shì hǎochī, búguò yóu tài duō...",
            vietnameseMeaning: "Bạn thấy món ăn Trung Quốc có ngon không? -> Ngon thì ngon thật, nhưng nhiều dầu mỡ quá..."
          },
          {
            teacherQuestion: "你喜欢吃什么菜？",
            pinyinQuestion: "Nǐ xǐhuan chī shénme cài?",
            studentAnswer: "我最喜欢吃韩国菜 / 我喜欢吃中国菜 / 我喜欢吃越南菜 / 我喜欢吃辣的...",
            pinyinAnswer: "Wǒ zuì xǐhuan chī Hánguócài...",
            vietnameseMeaning: "Bạn thích ăn món gì? -> Tôi thích ăn món Hàn Quốc nhất / thích món Việt..."
          },
          {
            teacherQuestion: "你不喜欢吃什么？",
            pinyinQuestion: "Nǐ bù xǐhuan chī shénme?",
            studentAnswer: "就是不喜欢吃甜的 / 我不喜欢吃苦的 / 我不喜欢吃油腻的...",
            pinyinAnswer: "Jiùshì bù xǐhuan chī tián de...",
            vietnameseMeaning: "Bạn không thích ăn gì? -> Chỉ là tôi không thích ăn đồ ngọt thôi..."
          },
          {
            teacherQuestion: "小姐，结账！",
            pinyinQuestion: "Xiǎojiě, jiézhàng!",
            studentAnswer: "好的，请稍等 / 来啦 / 一共一百块...",
            pinyinAnswer: "Hǎo de, qǐng shāoděng...",
            vietnameseMeaning: "Cô phục vụ ơi, tính tiền! -> Vâng, xin đợi một lát / Tổng cộng 100 tệ..."
          },
          {
            teacherQuestion: "谁来付钱？",
            pinyinQuestion: "Shéi lái fù qián?",
            studentAnswer: "我来付钱 / 他付钱 / 今天我付钱 / 我们AA制...",
            pinyinAnswer: "Wǒ lái fù qián...",
            vietnameseMeaning: "Ai trả tiền? -> Để tôi trả tiền..."
          },
          {
            teacherQuestion: "今天谁请客？",
            pinyinQuestion: "Jīntiān shéi qǐngkè?",
            studentAnswer: "今天我请客 / 今天他请客 / 我请客...",
            pinyinAnswer: "Jīntiān wǒ qǐngkè...",
            vietnameseMeaning: "Hôm nay ai mời? -> Hôm nay tôi mời / Tôi khao..."
          },
          {
            teacherQuestion: "以后你请我吃什么菜？",
            pinyinQuestion: "Yǐhòu nǐ qǐng wǒ chī shénme cài?",
            studentAnswer: "好，以后我请你吃韩国菜 / 以后我请你吃越南菜 / 请你吃烤鸭...",
            pinyinAnswer: "Hǎo, yǐhòu wǒ qǐng nǐ chī Hánguócài...",
            vietnameseMeaning: "Sau này bạn mời tôi ăn món gì? -> Sau này tôi sẽ mời bạn ăn món Hàn Quốc / món Việt..."
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 8,
    internalLessonIndex: 8,
    title: "Sở thích & Gọi điện",
    chineseTitle: "打电话与转告留言",
    pinyin: "Dǎ diànhuà yǔ zhuǎngào liúyán",
    theme: "Liên lạc & Nhắn tin qua điện thoại",
    summary: "Hội thoại gọi điện thoại đến ký túc xá lưu học sinh, hỏi thăm, để lại lời nhắn số điện thoại và chuyển máy.",
    grammarPoints: [
      "Câu mở đầu điện thoại: 喂，是... 吗？ (A lô, có phải... không?).",
      "Hỏi họ lịch sự: 请问，先生贵姓？ -> 姓张.",
      "Để lại lời nhắn: 请留言, 请回电话..."
    ],
    vocabulary: [
      { hanzi: "留学生宿舍", pinyin: "liúxuéshēng sùshè", meaning: "ký túc xá du học sinh" },
      { hanzi: "留言", pinyin: "liúyán", meaning: "để lại lời nhắn" },
      { hanzi: "转", pinyin: "zhuǎn", meaning: "chuyển máy" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "喂，是留学生宿舍吗？",
        pinyinQuestion: "Wèi, shì liúxuéshēng sùshè ma?",
        studentAnswer: "是的，请问您找谁？",
        pinyinAnswer: "Shì de, qǐngwèn nín zhǎo shéi?",
        vietnameseMeaning: "Vâng đúng rồi, xin hỏi bác tìm ai ạ?"
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Bài 15 Dịch câu",
        chineseSubtitle: "翻译句子",
        pinyinSubtitle: "Fānyì jùzi",
        vietnameseSubtitle: "Luyện dịch 30 câu tiếng Việt sang tiếng Trung",
        keyGrammar: "Giáo viên AI nói câu tiếng Việt (tiếng việt phát âm chuẩn). Yêu cầu Học sinh trả lời câu dịch đúng ý nghĩa: dịch câu tiếng Việt của giáo viên AI sang tiếng Trung.",
        vocabulary: [
          { hanzi: "邮局", pinyin: "yóujú", meaning: "bưu điện" },
          { hanzi: "怎么走", pinyin: "zěnme zǒu", meaning: "đi như thế nào" },
          { hanzi: "一直", pinyin: "yìzhí", meaning: "đi thẳng" },
          { hanzi: "往", pinyin: "wǎng", meaning: "hướng về" },
          { hanzi: "十字路口", pinyin: "shízì lùkǒu", meaning: "ngã tư" },
          { hanzi: "右拐", pinyin: "yòuguǎi", meaning: "rẽ phải" },
          { hanzi: "离", pinyin: "lí", meaning: "cách" },
          { hanzi: "百货大楼", pinyin: "bǎihuò dàlóu", meaning: "cửa hàng bách hóa" },
          { hanzi: "公里", pinyin: "gōnglǐ", meaning: "ki-lô-mét" },
          { hanzi: "过马路", pinyin: "guò mǎlù", meaning: "qua đường" },
          { hanzi: "公共汽车", pinyin: "gōnggòng qìchē", meaning: "xe buýt" },
          { hanzi: "地铁", pinyin: "dìtiě", meaning: "tàu điện ngầm" },
          { hanzi: "天安门", pinyin: "Tiān'ānmén", meaning: "Thiên An Môn" },
          { hanzi: "或者", pinyin: "huòzhě", meaning: "hoặc là" },
          { hanzi: "近", pinyin: "jìn", meaning: "gần" },
          { hanzi: "骑车", pinyin: "qí chē", meaning: "đạp xe" },
          { hanzi: "技术", pinyin: "jìshù", meaning: "kỹ thuật, kỹ năng" },
          { hanzi: "周末", pinyin: "zhōumò", meaning: "cuối tuần" },
          { hanzi: "大同", pinyin: "Dàtóng", meaning: "Đại Đồng" },
          { hanzi: "火车", pinyin: "huǒchē", meaning: "tàu hỏa" },
          { hanzi: "飞机", pinyin: "fēijī", meaning: "máy bay" },
          { hanzi: "舒服", pinyin: "shūfu", meaning: "thoải mái" },
          { hanzi: "北宁", pinyin: "Běiníng", meaning: "Bắc Ninh" },
          { hanzi: "高", pinyin: "gāo", meaning: "cao" },
          { hanzi: "重", pinyin: "zhòng", meaning: "nặng" },
          { hanzi: "公斤", pinyin: "gōngjīn", meaning: "ki-lô-gam" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "Đi bưu điện đi như thế nào?",
            studentAnswer: "去邮局怎么走",
            pinyinAnswer: "Qù yóujú zěnme zǒu",
            vietnameseMeaning: "Đi bưu điện đi như thế nào?"
          },
          {
            teacherQuestion: "Đi thẳng về phía trước.",
            studentAnswer: "一直往前走",
            pinyinAnswer: "Yìzhí wǎng qián zǒu",
            vietnameseMeaning: "Đi thẳng về phía trước."
          },
          {
            teacherQuestion: "Đến ngã tư thì rẽ phải.",
            studentAnswer: "到十字路口往右拐",
            pinyinAnswer: "Dào shízì lùkǒu wǎng yòuguǎi",
            vietnameseMeaning: "Đến ngã tư thì rẽ phải."
          },
          {
            teacherQuestion: "Cách đây bao xa?",
            studentAnswer: "离这儿多远",
            pinyinAnswer: "Lí zhèr duō yuǎn",
            vietnameseMeaning: "Cách đây bao xa?"
          },
          {
            teacherQuestion: "Hơn 200 mét.",
            studentAnswer: "二百多米",
            pinyinAnswer: "Èrbǎi duō mǐ",
            vietnameseMeaning: "Hơn 200 mét."
          },
          {
            teacherQuestion: "Từ đây đến cửa hàng bách hóa tổng hợp cách bao xa?",
            studentAnswer: "从这儿到百货大楼有多远",
            pinyinAnswer: "Cóng zhèr dào bǎihuò dàlóu yǒu duō yuǎn",
            vietnameseMeaning: "Từ đây đến cửa hàng bách hóa tổng hợp cách bao xa?"
          },
          {
            teacherQuestion: "Khoảng 13 đến 14 ki-lô-mét.",
            studentAnswer: "十三四公里",
            pinyinAnswer: "Shísān sì gōnglǐ",
            vietnameseMeaning: "Khoảng 13 đến 14 ki-lô-mét."
          },
          {
            teacherQuestion: "Đi xe như thế nào?",
            studentAnswer: "怎么坐车",
            pinyinAnswer: "Zěnme zuò chē",
            vietnameseMeaning: "Đi xe như thế nào?"
          },
          {
            teacherQuestion: "Qua đường, trước tiên đi xe buýt số 2.",
            studentAnswer: "过马路.先做2路公共汽车",
            pinyinAnswer: "Guò mǎlù. Xiān zuò èr lù gōnggòng qìchē",
            vietnameseMeaning: "Qua đường, trước tiên đi xe buýt số 2."
          },
          {
            teacherQuestion: "Sau đó chuyển sang tàu điện ngầm.",
            studentAnswer: "然后换地铁",
            pinyinAnswer: "Ránhòu huàn dìtiě",
            vietnameseMeaning: "Sau đó chuyển sang tàu điện ngầm."
          },
          {
            teacherQuestion: "Xin hỏi, tôi muốn đến Thiên An Môn.",
            studentAnswer: "请问.我去天安门.",
            pinyinAnswer: "Qǐngwèn. Wǒ qù Tiān'ānmén.",
            vietnameseMeaning: "Xin hỏi, tôi muốn đến Thiên An Môn."
          },
          {
            teacherQuestion: "Tôi nên đi đường nào?",
            studentAnswer: "应该走哪条路",
            pinyinAnswer: "Yīnggāi zǒu nǎ tiáo lù",
            vietnameseMeaning: "Tôi nên đi đường nào?"
          },
          {
            teacherQuestion: "Đi đường này hay đường kia đều được.",
            studentAnswer: "走这条路或者那条路都行",
            pinyinAnswer: "Zǒu zhè tiáo lù huòzhě nà tiáo lù dōu xíng",
            vietnameseMeaning: "Đi đường này hay đường kia đều được."
          },
          {
            teacherQuestion: "Đường nào gần hơn?",
            studentAnswer: "哪条路近",
            pinyinAnswer: "Nǎ tiáo lù jìn",
            vietnameseMeaning: "Đường nào gần hơn?"
          },
          {
            teacherQuestion: "Đường này gần hơn, nhưng hơi lộn xộn.",
            studentAnswer: "这条路近.不过有点儿乱",
            pinyinAnswer: "Zhè tiáo lù jìn. Búguò yǒudiǎnr luàn",
            vietnameseMeaning: "Đường này gần hơn, nhưng hơi lộn xộn."
          },
          {
            teacherQuestion: "Kỹ năng đi xe đạp của tôi không giỏi lắm.",
            studentAnswer: "我骑车技术不太高",
            pinyinAnswer: "Wǒ qí chē jìshù bú tài gāo",
            vietnameseMeaning: "Kỹ năng đi xe đạp của tôi không giỏi lắm."
          },
          {
            teacherQuestion: "Hay là đi đường kia nhé.",
            studentAnswer: "还是走那条路吧",
            pinyinAnswer: "Háishi zǒu nà tiáo lù ba",
            vietnameseMeaning: "Hay là đi đường kia nhé."
          },
          {
            teacherQuestion: "Cuối tuần chúng ta đi Đại Đồng nhé, được không?",
            studentAnswer: "周末咱们去大同好吗",
            pinyinAnswer: "Zhōumò zánmen qù Dàtóng hǎo ma",
            vietnameseMeaning: "Cuối tuần chúng ta đi Đại Đồng nhé, được không?"
          },
          {
            teacherQuestion: "Được đấy! Đi tàu hỏa hay đi máy bay?",
            studentAnswer: "好啊.坐火车去还是坐飞机去",
            pinyinAnswer: "Hǎo a. Zuò huǒchē qù háishì zuò fēijī qù",
            vietnameseMeaning: "Được đấy! Đi tàu hỏa hay đi máy bay?"
          },
          {
            teacherQuestion: "Đi máy bay nhé, vừa nhanh vừa thoải mái.",
            studentAnswer: "坐飞机去吧. 又快又舒服",
            pinyinAnswer: "Zuò fēijī qù ba. Yòu kuài yòu shūfu",
            vietnameseMeaning: "Đi máy bay nhé, vừa nhanh vừa thoải mái."
          },
          {
            teacherQuestion: "Nhưng đi máy bay đắt quá.",
            studentAnswer: "可是.坐飞机太贵了",
            pinyinAnswer: "Kěshì. Zuò fēijī tài guì le",
            vietnameseMeaning: "Nhưng đi máy bay đắt quá."
          },
          {
            teacherQuestion: "Hay là đi tàu hỏa nhé.",
            studentAnswer: "还是坐火车吧",
            pinyinAnswer: "Háishi zuò huǒchē ba",
            vietnameseMeaning: "Hay là đi tàu hỏa nhé."
          },
          {
            teacherQuestion: "Từ đây đến thành phố Bắc Ninh cách bao xa?",
            studentAnswer: "从这到北宁城市有多远",
            pinyinAnswer: "Cóng zhè dào Běiníng chéngshì yǒu duō yuǎn",
            vietnameseMeaning: "Từ đây đến thành phố Bắc Ninh cách bao xa?"
          },
          {
            teacherQuestion: "Khoảng 12 đến 13 ki-lô-mét.",
            studentAnswer: "十二三公里",
            pinyinAnswer: "Shí'èr sān gōnglǐ",
            vietnameseMeaning: "Khoảng 12 đến 13 ki-lô-mét."
          },
          {
            teacherQuestion: "Khoảng 40 đến 50 học sinh.",
            studentAnswer: "四五十学生",
            pinyinAnswer: "Sì wǔshí xuésheng",
            vietnameseMeaning: "Khoảng 40 đến 50 học sinh."
          },
          {
            teacherQuestion: "Bạn cao bao nhiêu?",
            studentAnswer: "你多高",
            pinyinAnswer: "Nǐ duō gāo",
            vietnameseMeaning: "Bạn cao bao nhiêu?"
          },
          {
            teacherQuestion: "Tôi cao 1 mét 65.",
            studentAnswer: "我高1米65",
            pinyinAnswer: "Wǒ gāo yì mǐ liùshíwǔ",
            vietnameseMeaning: "Tôi cao 1 mét 65."
          },
          {
            teacherQuestion: "Bạn nặng bao nhiêu?",
            studentAnswer: "你多重",
            pinyinAnswer: "Nǐ duō zhòng",
            vietnameseMeaning: "Bạn nặng bao nhiêu?"
          },
          {
            teacherQuestion: "Tôi nặng hơn 60 ki-lô-gam.",
            studentAnswer: "我重60多公斤",
            pinyinAnswer: "Wǒ zhòng liùshí duō gōngjīn",
            vietnameseMeaning: "Tôi nặng hơn 60 ki-lô-gam."
          },
          {
            teacherQuestion: "Tôi nặng hơn 65 ki-lô-gam một chút.",
            studentAnswer: "我重65公斤多",
            pinyinAnswer: "Wǒ zhòng liùshíwǔ gōngjīn duō",
            vietnameseMeaning: "Tôi nặng hơn 65 ki-lô-gam một chút."
          }
        ]
      },
      {
        sectionNumber: 2,
        title: "Bài 15 Giao tiếp",
        chineseSubtitle: "双向交际",
        pinyinSubtitle: "Shuāngxiàng jiāojì",
        vietnameseSubtitle: "Luyện phản xạ 15 câu giao tiếp",
        keyGrammar: "Luyện phản xạ hội thoại hai chiều. Giáo viên AI đóng vai trò người bản xứ Trung Quốc hỏi các câu hỏi. Học sinh trả lời đúng ý nghĩa câu hỏi và đúng ngữ pháp là được. Nếu đúng thì khen “Tốt lắm” hoặc “Rất tốt”. Nếu sai sửa lỗi ngữ pháp, phát âm và giải thích bằng tiếng Việt.",
        vocabulary: [
          { hanzi: "邮局", pinyin: "yóujú", meaning: "bưu điện" },
          { hanzi: "怎么走", pinyin: "zěnme zǒu", meaning: "đi như thế nào" },
          { hanzi: "离", pinyin: "lí", meaning: "cách" },
          { hanzi: "多远", pinyin: "duō yuǎn", meaning: "bao xa" },
          { hanzi: "百货大楼", pinyin: "bǎihuò dàlóu", meaning: "cửa hàng bách hóa tổng hợp" },
          { hanzi: "坐车", pinyin: "zuò chē", meaning: "đi xe" },
          { hanzi: "天安门", pinyin: "Tiān'ānmén", meaning: "Thiên An Môn" },
          { hanzi: "哪条路", pinyin: "nǎ tiáo lù", meaning: "đường nào" },
          { hanzi: "近", pinyin: "jìn", meaning: "gần" },
          { hanzi: "骑车", pinyin: "qí chē", meaning: "đạp xe" },
          { hanzi: "技术", pinyin: "jìshù", meaning: "kỹ thuật, kỹ năng" },
          { hanzi: "大同", pinyin: "Dàtóng", meaning: "Đại Đồng" },
          { hanzi: "飞机", pinyin: "fēijī", meaning: "máy bay" },
          { hanzi: "贵", pinyin: "guì", meaning: "đắt" },
          { hanzi: "火车", pinyin: "huǒchē", meaning: "tàu hỏa" },
          { hanzi: "北宁", pinyin: "Běiníng", meaning: "Bắc Ninh" },
          { hanzi: "学生", pinyin: "xuésheng", meaning: "học sinh" },
          { hanzi: "多高", pinyin: "duō gāo", meaning: "cao bao nhiêu" },
          { hanzi: "多重", pinyin: "duō zhòng", meaning: "nặng bao nhiêu" },
          { hanzi: "公斤", pinyin: "gōngjīn", meaning: "ki-lô-gam" }
        ],
        dialogueHighlights: [
          {
            teacherQuestion: "去邮局怎么走？",
            pinyinQuestion: "Qù yóujú zěnme zǒu?",
            studentAnswer: "一直往前走，到十字路口往右拐。",
            pinyinAnswer: "Yìzhí wǎng qián zǒu, dào shízì lùkǒu wǎng yòuguǎi.",
            vietnameseMeaning: "Đi bưu điện đi như thế nào? Đi thẳng về phía trước, đến ngã tư rẽ phải."
          },
          {
            teacherQuestion: "离这儿多远？",
            pinyinQuestion: "Lí zhèr duō yuǎn?",
            studentAnswer: "离这儿不太远，二百多米。",
            pinyinAnswer: "Lí zhèr bú tài yuǎn, èrbǎi duō mǐ.",
            vietnameseMeaning: "Cách đây bao xa? Cách đây không xa lắm, hơn 200 mét."
          },
          {
            teacherQuestion: "从这儿到百货大楼有多远？",
            pinyinQuestion: "Cóng zhèr dào bǎihuò dàlóu yǒu duō yuǎn?",
            studentAnswer: "大概十三四公里。",
            pinyinAnswer: "Dàgài shísān sì gōnglǐ.",
            vietnameseMeaning: "Từ đây đến cửa hàng bách hóa tổng hợp cách bao xa? Khoảng 13 đến 14 ki-lô-mét."
          },
          {
            teacherQuestion: "怎么坐车？",
            pinyinQuestion: "Zěnme zuò chē?",
            studentAnswer: "过马路，先做2路公共汽车，然后换地铁。",
            pinyinAnswer: "Guò mǎlù, xiān zuò èr lù gōnggòng qìchē, ránhòu huàn dìtiě.",
            vietnameseMeaning: "Đi xe như thế nào? Qua đường, trước tiên đi xe buýt số 2, sau đó chuyển sang tàu điện ngầm."
          },
          {
            teacherQuestion: "请问，我去天安门，应该走哪条路？",
            pinyinQuestion: "Qǐngwèn, wǒ qù Tiān'ānmén, yīnggāi zǒu nǎ tiáo lù?",
            studentAnswer: "走这条路或者那条路都行。",
            pinyinAnswer: "Zǒu zhè tiáo lù huòzhě nà tiáo lù dōu xíng.",
            vietnameseMeaning: "Xin hỏi, tôi muốn đến Thiên An Môn, tôi nên đi đường nào? Đi đường này hoặc đường kia đều được."
          },
          {
            teacherQuestion: "哪条路近？",
            pinyinQuestion: "Nǎ tiáo lù jìn?",
            studentAnswer: "这条路近，不过有点儿乱。",
            pinyinAnswer: "Zhè tiáo lù jìn, búguò yǒudiǎnr luàn.",
            vietnameseMeaning: "Đường nào gần hơn? Đường này gần hơn, nhưng hơi lộn xộn."
          },
          {
            teacherQuestion: "我骑车技术不太高，怎么办？",
            pinyinQuestion: "Wǒ qí chē jìshù bú tài gāo, zěnme bàn?",
            studentAnswer: "还是走那条路吧。",
            pinyinAnswer: "Háishi zǒu nà tiáo lù ba.",
            vietnameseMeaning: "Kỹ năng đi xe đạp của tôi không giỏi lắm, phải làm sao? Hay là đi đường kia nhé."
          },
          {
            teacherQuestion: "周末咱们去大同好吗？",
            pinyinQuestion: "Zhōumò zánmen qù Dàtóng hǎo ma?",
            studentAnswer: "好啊！坐火车去还是坐飞机去？",
            pinyinAnswer: "Hǎo a! Zuò huǒchē qù háishì zuò fēijī qù?",
            vietnameseMeaning: "Cuối tuần chúng ta đi Đại Đồng nhé, được không? Được đấy! Đi tàu hỏa hay máy bay?"
          },
          {
            teacherQuestion: "坐飞机去怎么样？",
            pinyinQuestion: "Zuò fēijī qù zěnmeyàng?",
            studentAnswer: "坐飞机去吧，又快又舒服。",
            pinyinAnswer: "Zuò fēijī qù ba, yòu kuài yòu shūfu.",
            vietnameseMeaning: "Đi máy bay thì thế nào? Đi máy bay nhé, vừa nhanh vừa thoải mái."
          },
          {
            teacherQuestion: "可是，坐飞机太贵了，怎么办？",
            pinyinQuestion: "Kěshì, zuò fēijī tài guì le, zěnme bàn?",
            studentAnswer: "还是坐火车吧。",
            pinyinAnswer: "Háishi zuò huǒchē ba.",
            vietnameseMeaning: "Nhưng đi máy bay đắt quá, phải làm sao? Hay là đi tàu hỏa nhé."
          },
          {
            teacherQuestion: "从这儿到北宁城市有多远？",
            pinyinQuestion: "Cóng zhèr dào Běiníng chéngshì yǒu duō yuǎn?",
            studentAnswer: "从这到北宁城市大概十二三公里。",
            pinyinAnswer: "Cóng zhè dào Běiníng chéngshì dàgài shí'èr sān gōnglǐ.",
            vietnameseMeaning: "Từ đây đến thành phố Bắc Ninh cách bao xa? Khoảng 12 đến 13 ki-lô-mét."
          },
          {
            teacherQuestion: "有多少学生？",
            pinyinQuestion: "Yǒu duōshǎo xuésheng?",
            studentAnswer: "大概四五十学生。",
            pinyinAnswer: "Dàgài sì wǔshí xuésheng.",
            vietnameseMeaning: "Có bao nhiêu học sinh? Khoảng 40 đến 50 học sinh."
          },
          {
            teacherQuestion: "你多高？",
            pinyinQuestion: "Nǐ duō gāo?",
            studentAnswer: "我高1米65。",
            pinyinAnswer: "Wǒ gāo yì mǐ liùshíwǔ.",
            vietnameseMeaning: "Bạn cao bao nhiêu? Tôi cao 1 mét 65."
          },
          {
            teacherQuestion: "你多重？",
            pinyinQuestion: "Nǐ duō zhòng?",
            studentAnswer: "我重60多公斤。",
            pinyinAnswer: "Wǒ zhòng liùshí duō gōngjīn.",
            vietnameseMeaning: "Bạn nặng bao nhiêu? Tôi nặng hơn 60 ki-lô-gam."
          },
          {
            teacherQuestion: "你具体有多重？",
            pinyinQuestion: "Nǐ jùtǐ yǒu duō zhòng?",
            studentAnswer: "我重65公斤多。",
            pinyinAnswer: "Wǒ zhòng liùshíwǔ gōngjīn duō.",
            vietnameseMeaning: "Bạn cụ thể nặng bao nhiêu? Tôi nặng hơn 65 ki-lô-gam một chút."
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Đoạn 3",
        chineseSubtitle: "转告留言与记录号码",
        pinyinSubtitle: "Zhuǎngào liúyán yǔ jìlù hàomǎ",
        vietnameseSubtitle: "Nhờ chuyển lời nhắn & Ghi lại số điện thoại",
        keyGrammar: "请转告他 / 请留言 / 转2997",
        dialogueHighlights: [
          {
            teacherQuestion: "您有什么事需要我转告吗？",
            pinyinQuestion: "Nín yǒu shénme shì xūyào wǒ zhuǎngào ma?",
            studentAnswer: "请转告他给我回个电话：62327531转2997。",
            pinyinAnswer: "Qǐng zhuǎngào tā gěi wǒ huí gè diànhuà: 62327531 zhuǎn 2997.",
            vietnameseMeaning: "Nhờ bạn chuyển lời bảo cậu ấy gọi lại cho tôi: 62327531 máy lẻ 2997."
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Đoạn 4",
        chineseSubtitle: "礼貌致谢与道别",
        pinyinSubtitle: "Lǐmào zhìxiè yǔ dàobié",
        vietnameseSubtitle: "Cảm ơn lịch thiệp & Tạm biệt",
        keyGrammar: "麻烦您了 / 不客气，再见",
        dialogueHighlights: [
          {
            teacherQuestion: "好的，我一定转告他。",
            pinyinQuestion: "Hǎo de, wǒ yídìng zhuǎngào tā.",
            studentAnswer: "太谢谢您了，再见！",
            pinyinAnswer: "Tài xièxie nín le, zàijiàn!",
            vietnameseMeaning: "Cảm ơn bạn nhiều lắm, tạm biệt nhé!"
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 9,
    internalLessonIndex: 9,
    title: "Đổi tiền & Nhờ vả",
    chineseTitle: "复合趋向补语与请求帮忙",
    pinyin: "Fùhé qūxiàng bǔyǔ yǔ qǐngqiú bāngmáng",
    theme: "Bổ ngữ xu hướng phức & Nhờ giúp đỡ",
    summary: "Học các động từ chỉ hướng như 进屋来, 寄回去, 上楼去 và cách nhờ bạn bè giúp đỡ một cách lịch sự, nhã nhặn.",
    grammarPoints: [
      "Bổ ngữ xu hướng phức: Động từ + 上/下/进/出/回/过 + 来/去 (买回来, 进屋来).",
      "Câu mời lịch sự: 快进屋来吧 (Mau vào phòng đi).",
      "Cách nói cảm ơn và đáp lễ: 别客气 / 麻烦你了."
    ],
    vocabulary: [
      { hanzi: "打扰", pinyin: "dǎrǎo", meaning: "làm phiền" },
      { hanzi: "寄回国", pinyin: "jì huíguó", meaning: "gửi về nước" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "莉莉呢？",
        pinyinQuestion: "Lìlì ne?",
        studentAnswer: "她到书店去了，你快进屋来等她吧。",
        pinyinAnswer: "Tā dào shūdiàn qù le, nǐ kuài jìn wū lái děng tā ba.",
        vietnameseMeaning: "Lily đi hiệu sách rồi, bạn mau vào nhà đợi bạn ấy đi."
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Đoạn 1",
        chineseSubtitle: "进屋来等与热情接待",
        pinyinSubtitle: "Jìn wū lái děng yǔ rèqíng jiēdài",
        vietnameseSubtitle: "Mời vào phòng đợi & Đón tiếp niềm nở",
        keyGrammar: "快进屋来吧 / 到书店去了",
        dialogueHighlights: [
          {
            teacherQuestion: "莉莉呢？",
            pinyinQuestion: "Lìlì ne?",
            studentAnswer: "她出去了，她到书店去了，你快进屋来等她吧。",
            pinyinAnswer: "Tā chūqu le, tā dào shūdiàn qù le, nǐ kuài jìn wū lái děng tā ba.",
            vietnameseMeaning: "Lily ra ngoài rồi, cô ấy đi hiệu sách, bạn mau vào nhà ngồi đợi nhé."
          }
        ]
      },
      {
        sectionNumber: 2,
        title: "Đoạn 2",
        chineseSubtitle: "寄书回国与收拾行李",
        pinyinSubtitle: "Jì shū huíguó yǔ shōushi xíngli",
        vietnameseSubtitle: "Gửi sách vở về nước & Đóng gói đồ đạc",
        keyGrammar: "寄回国去 / 带回去",
        dialogueHighlights: [
          {
            teacherQuestion: "这些书和磁带准备怎么办？",
            pinyinQuestion: "Zhè xiē shū hé cídài zhǔnbèi zěnmebàn?",
            studentAnswer: "我准备寄回国去。",
            pinyinAnswer: "Wǒ zhǔnbèi jì huíguó qù.",
            vietnameseMeaning: "Những quyển sách và cuộn băng này tôi chuẩn bị gửi về nước."
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Đoạn 3",
        chineseSubtitle: "请求帮忙与去邮局",
        pinyinSubtitle: "Qǐngqiú bāngmáng yǔ qù yóujú",
        vietnameseSubtitle: "Nhờ vả bạn bè cùng đi bưu điện",
        keyGrammar: "麻烦你跟我一起去 / 搬下去",
        dialogueHighlights: [
          {
            teacherQuestion: "包裹太重了怎么办？",
            pinyinQuestion: "Bāoguǒ tài zhòng le zěnmebàn?",
            studentAnswer: "能麻烦你帮我一起把包裹搬下楼去吗？",
            pinyinAnswer: "Néng máfan nǐ bāng wǒ yìqǐ bǎ bāoguǒ bān xià lóu qù ma?",
            vietnameseMeaning: "Phiền bạn giúp tôi mang bưu kiện xuống lầu được không?"
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Đoạn 4",
        chineseSubtitle: "真诚感谢与朋友情谊",
        pinyinSubtitle: "Zhēnchéng gǎnxiè yǔ péngyou qíngyì",
        vietnameseSubtitle: "Lời cảm ơn chân thành & Tình bạn thắm thiết",
        keyGrammar: "太麻烦你了 / 咱们是好朋友",
        dialogueHighlights: [
          {
            teacherQuestion: "没问题，咱们马上走吧。",
            pinyinQuestion: "Méi wèntí, zánmen mǎshàng zǒu ba.",
            studentAnswer: "太感谢你了，真不好意思麻烦你。",
            pinyinAnswer: "Tài gǎnxiè nǐ le, zhēn bù hǎoyìsi máfan nǐ.",
            vietnameseMeaning: "Cảm ơn bạn rất nhiều, thật ngại quá làm phiền bạn."
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 10,
    internalLessonIndex: 10,
    title: "Xem phim & Dã ngoại",
    chineseTitle: "看电影与条件句",
    pinyin: "Kàn diànyǐng yǔ tiáojiàn jù",
    theme: "Giải trí & Bổ ngữ khả năng",
    summary: "Học cách rủ bạn đi xem phim, dùng cấu trúc giả định 如果... 的话 và bổ ngữ khả năng 听得懂 / 听不懂.",
    grammarPoints: [
      "Cấu trúc giả định: 如果... 的话: Nếu như...",
      "Bổ ngữ khả năng: 听得懂 (nghe hiểu được) / 听不懂 (nghe không hiểu).",
      "Lượng từ và phụ đề: 中文字幕 (phụ đề tiếng Trung)."
    ],
    vocabulary: [
      { hanzi: "空儿", pinyin: "kòngr", meaning: "thời gian rảnh" },
      { hanzi: "中文字幕", pinyin: "zhōngwén zìmù", meaning: "phụ đề tiếng Trung" },
      { hanzi: "精彩", pinyin: "jīngcǎi", meaning: "hấp dẫn" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "今晚你和保罗有空儿的话，我想请你们做什么？",
        pinyinQuestion: "Jīnwǎn nǐ hé Bǎoluó yǒu kòngr dehuà, wǒ xiǎng qǐng nǐmen qù zuò shénme?",
        studentAnswer: "你想请我们去看电影。",
        pinyinAnswer: "Nǐ xiǎng qǐng wǒmen qù kàn diànyǐng.",
        vietnameseMeaning: "Bạn muốn mời chúng tôi đi xem phim."
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Đoạn 1",
        chineseSubtitle: "相约看电影的邀请",
        pinyinSubtitle: "Xiāngyuē kàn diànyǐng de yāoqǐng",
        vietnameseSubtitle: "Lời mời rủ đi xem phim tối nay",
        keyGrammar: "如果有空儿的话 / 请你们去看电影",
        dialogueHighlights: [
          {
            teacherQuestion: "今晚你和保罗有空儿的话，我想请你们去做什么？",
            pinyinQuestion: "Jīnwǎn nǐ hé Bǎoluó yǒu kòngr dehuà, wǒ xiǎng qǐng nǐmen qù zuò shénme?",
            studentAnswer: "你想请我们去看电影。",
            pinyinAnswer: "Nǐ xiǎng qǐng wǒmen qù kàn diànyǐng.",
            vietnameseMeaning: "Nếu tối nay rảnh thì bạn muốn mời chúng tôi đi xem phim."
          }
        ]
      },
      {
        sectionNumber: 2,
        title: "Đoạn 2",
        chineseSubtitle: "听力担忧与中文字幕",
        pinyinSubtitle: "Tīnglì dānyōu yǔ zhōngwén zìmù",
        vietnameseSubtitle: "Lo lắng khả năng nghe & Yên tâm có phụ đề",
        keyGrammar: "听得懂 / 听不懂 / 有中文字幕",
        dialogueHighlights: [
          {
            teacherQuestion: "你担心什么？",
            pinyinQuestion: "Nǐ dānxīn shénme?",
            studentAnswer: "我担心听不懂，不过有中文字幕就没问题。",
            pinyinAnswer: "Wǒ dānxīn tīngbudǒng, búguò yǒu zhōngwén zìmù jiù méi wèntí.",
            vietnameseMeaning: "Tôi lo nghe không hiểu, nhưng có phụ đề chữ Hán thì không sao."
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Đoạn 3",
        chineseSubtitle: "买票选座与电影院",
        pinyinSubtitle: "Mǎi piào xuǎn zuò yǔ diànyǐngyuàn",
        vietnameseSubtitle: "Mua vé & Chọn vị trí ngồi đẹp ở rạp",
        keyGrammar: "买三张票 / 坐在中间",
        dialogueHighlights: [
          {
            teacherQuestion: "咱们买几点的电影票？",
            pinyinQuestion: "Zánmen mǎi jǐ diǎn de diànyǐng piào?",
            studentAnswer: "咱们买晚上七点半的吧，位置在中间最好。",
            pinyinAnswer: "Zánmen mǎi wǎnshang qī diǎn bàn de ba, wèizhi zài zhōngjiān zuì hǎo.",
            vietnameseMeaning: "Chúng mình mua vé 7h30 tối đi, chỗ ở giữa là đẹp nhất."
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Đoạn 4",
        chineseSubtitle: "电影评价与愉快夜晚",
        pinyinSubtitle: "Diànyǐng píngjià yǔ yúkuài yèwǎn",
        vietnameseSubtitle: "Đánh giá phim hay & Một tối vui vẻ",
        keyGrammar: "特别精彩 / 很有意思",
        dialogueHighlights: [
          {
            teacherQuestion: "你觉得这部电影怎么样？",
            pinyinQuestion: "Nǐ juéde zhè bù diànyǐng zěnmeyàng?",
            studentAnswer: "这部电影太精彩了，不仅故事感人，而且我都看懂了！",
            pinyinAnswer: "Zhè bù diànyǐng tài jīngcǎi le, bùjǐn gùshi gǎnrén, érqiě wǒ dōu kàndǒng le!",
            vietnameseMeaning: "Bộ phim này xuất sắc quá, câu chuyện cảm động mà tôi đều hiểu hết!"
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 11,
    internalLessonIndex: 11,
    title: "Tại khách sạn",
    chineseTitle: "入住宾馆与前台服务",
    pinyin: "Rùzhù bīnguǎn yǔ qiántái fúwù",
    theme: "Nghiệp vụ khách sạn & Du lịch",
    summary: "Đặt phòng, làm thủ tục check-in tại khách sạn, hỏi mật khẩu Wifi, yêu cầu dọn phòng và thanh toán hóa đơn.",
    grammarPoints: [
      "Cách xưng hô và yêu cầu lịch sự: 请帮我..., 我想预订...",
      "Lượng từ phòng 间, chìa khóa 钥匙, thẻ phòng 房卡.",
      "Hỏi số tiền và đặt cọc: 押金 (tiền đặt cọc)."
    ],
    vocabulary: [
      { hanzi: "前台", pinyin: "qiántái", meaning: "quầy lễ tân" },
      { hanzi: "预订", pinyin: "yùdìng", meaning: "đặt trước" },
      { hanzi: "标准间", pinyin: "biāozhǔnjiān", meaning: "phòng tiêu chuẩn" },
      { hanzi: "房卡", pinyin: "fángkǎ", meaning: "thẻ mở phòng" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "先生，您要办理入住吗？",
        pinyinQuestion: "Xiānsheng, nín yào bànlǐ rùzhù ma?",
        studentAnswer: "是的，我之前预订了一间标准间。",
        pinyinAnswer: "Shì de, wǒ zhīqián yùdìng le yì jiān biāozhǔnjiān.",
        vietnameseMeaning: "Vâng, trước đó tôi có đặt một phòng tiêu chuẩn."
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Đoạn 1",
        chineseSubtitle: "前台办理入住手续",
        pinyinSubtitle: "Qiántái bànlǐ rùzhù shǒuxù",
        vietnameseSubtitle: "Làm thủ tục nhận phòng tại quầy lễ tân",
        keyGrammar: "办理入住 / 预订了标准间",
        dialogueHighlights: [
          {
            teacherQuestion: "先生，您要办理入住吗？",
            pinyinQuestion: "Xiānsheng, nín yào bànlǐ rùzhù ma?",
            studentAnswer: "是的，我之前预订了一间标准间。",
            pinyinAnswer: "Shì de, wǒ zhīqián yùdìng le yì jiān biāozhǔnjiān.",
            vietnameseMeaning: "Vâng, trước đó tôi có đặt trước một phòng tiêu chuẩn."
          }
        ]
      },
      {
        sectionNumber: 2,
        title: "Đoạn 2",
        chineseSubtitle: "出示护照与交付押金",
        pinyinSubtitle: "Chūshì hùzhào yǔ jiāofù yājīn",
        vietnameseSubtitle: "Xuất trình hộ chiếu & Đóng tiền đặt cọc",
        keyGrammar: "这是我的护照 / 押金五百块",
        dialogueHighlights: [
          {
            teacherQuestion: "请出示一下您的护照。",
            pinyinQuestion: "Qǐng chūshì yíxià nín de hùzhào.",
            studentAnswer: "好的，给您护照，请问需要付多少押金？",
            pinyinAnswer: "Hǎo de, gěi nín hùzhào, qǐngwèn xūyào fù duōshao yājīn?",
            vietnameseMeaning: "Được rồi, gửi bạn hộ chiếu, xin hỏi cần đóng bao nhiêu tiền cọc?"
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Đoạn 3",
        chineseSubtitle: "领取房卡与网络密码",
        pinyinSubtitle: "Lǐngqǔ fángkǎ yǔ wǎngluò mìmǎ",
        vietnameseSubtitle: "Nhận thẻ phòng & Mật khẩu Wifi",
        keyGrammar: "这是您的房卡 / 房间在八楼",
        dialogueHighlights: [
          {
            teacherQuestion: "这是您的房卡，在808房间。",
            pinyinQuestion: "Zhè shì nín de fángkǎ, zài bābālíng fángjiān.",
            studentAnswer: "谢谢，请问宾馆的无线网络密码是多少？",
            pinyinAnswer: "Xièxie, qǐngwèn bīnguǎn de wúxiàn wǎngluò mìmǎ shì duōshao?",
            vietnameseMeaning: "Cảm ơn, xin hỏi mật khẩu wifi của khách sạn là bao nhiêu?"
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Đoạn 4",
        chineseSubtitle: "退房结账与礼貌道别",
        pinyinSubtitle: "Tuìfáng jiézhàng yǔ lǐmào dàobié",
        vietnameseSubtitle: "Trả phòng, thanh toán & Lời tạm biệt",
        keyGrammar: "退房 / 退还押金",
        dialogueHighlights: [
          {
            teacherQuestion: "您好，您要办理退房吗？",
            pinyinQuestion: "Nín hǎo, nín yào bànlǐ tuìfáng ma?",
            studentAnswer: "是的，这是808房卡，请帮我结账。",
            pinyinAnswer: "Shì de, zhè shì bābālíng fángkǎ, qǐng bāng wǒ jiézhàng.",
            vietnameseMeaning: "Vâng, đây là thẻ phòng 808, phiền bạn thanh toán giúp tôi."
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 12,
    internalLessonIndex: 12,
    title: "Sức khỏe",
    chineseTitle: "身体健康与生活习惯",
    pinyin: "Shēntǐ jiànkāng yǔ shēnghuó xíguàn",
    theme: "Chăm sóc sức khỏe & Vận động",
    summary: "Bàn về thói quen giữ gìn sức khỏe, chạy bộ mỗi sáng, ăn uống thanh đạm và ngủ đủ giấc.",
    grammarPoints: [
      "Đối với sức khỏe: 对身体好 / 对身体不好.",
      "Phó từ tần suất: 经常, 从来不, 每天都.",
      "Cấu trúc so sánh 比: 比以前更健康."
    ],
    vocabulary: [
      { hanzi: "锻炼", pinyin: "duànliàn", meaning: "rèn luyện thể thao" },
      { hanzi: "散步", pinyin: "sànbù", meaning: "đi dạo" },
      { hanzi: "习惯", pinyin: "xíguàn", meaning: "thói quen" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "你平时经常锻炼身体吗？",
        pinyinQuestion: "Nǐ píngshí jīngcháng duànliàn shēntǐ ma?",
        studentAnswer: "我每天早上都去操场跑步半个小时。",
        pinyinAnswer: "Wǒ měitiān zǎoshang dōu qù cāochǎng pǎobù bàn gè xiǎoshí.",
        vietnameseMeaning: "Mỗi sáng tôi đều ra sân tập chạy bộ nửa tiếng."
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Đoạn 1",
        chineseSubtitle: "晨跑锻炼与操场运动",
        pinyinSubtitle: "Chénpǎo duànliàn yǔ cāochǎng yùndòng",
        vietnameseSubtitle: "Chạy bộ buổi sáng tại sân vận động",
        keyGrammar: "经常锻炼 / 跑步半个小时",
        dialogueHighlights: [
          {
            teacherQuestion: "你平时经常锻炼身体吗？",
            pinyinQuestion: "Nǐ píngshí jīngcháng duànliàn shēntǐ ma?",
            studentAnswer: "我每天早上都去操场跑步半个小时。",
            pinyinAnswer: "Wǒ měitiān zǎoshang dōu qù cāochǎng pǎobù bàn gè xiǎoshí.",
            vietnameseMeaning: "Mỗi sáng tôi đều ra sân vận động chạy bộ nửa tiếng."
          }
        ]
      },
      {
        sectionNumber: 2,
        title: "Đoạn 2",
        chineseSubtitle: "清淡饮食与健康营养",
        pinyinSubtitle: "Qīngdàn yǐnshí yǔ jiànkāng yíngyǎng",
        vietnameseSubtitle: "Chế độ ăn thanh đạm & Dinh dưỡng",
        keyGrammar: "多吃新鲜水果蔬菜 / 少油少盐",
        dialogueHighlights: [
          {
            teacherQuestion: "你的饮食习惯怎么样？",
            pinyinQuestion: "Nǐ de yǐnshí xíguàn zěnmeyàng?",
            studentAnswer: "我喜欢吃清淡的食物，多吃蔬菜和水果，这对身体好。",
            pinyinAnswer: "Wǒ xǐhuan chī qīngdàn de shíwù, duō chī shūcài hé shuǐguǒ, zhè duì shēntǐ hǎo.",
            vietnameseMeaning: "Tôi thích ăn thanh đạm, ăn nhiều rau quả, rất tốt cho sức khỏe."
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Đoạn 3",
        chineseSubtitle: "早睡早起与精神充沛",
        pinyinSubtitle: "Zǎoshuì zǎoqǐ yǔ jīngshén chōngpèi",
        vietnameseSubtitle: "Ngủ sớm dậy sớm & Tinh thần sảng khoái",
        keyGrammar: "从来不熬夜 / 精神很好",
        dialogueHighlights: [
          {
            teacherQuestion: "你经常熬夜吗？",
            pinyinQuestion: "Nǐ jīngcháng áoyè ma?",
            studentAnswer: "我从来不熬夜，每天晚上十点半就睡了，早晨特别有精神。",
            pinyinAnswer: "Wǒ cónglái bù áoyè, měitiān wǎnshang shí diǎn bàn jiù shuì le, zǎochén tèbié yǒu jīngshén.",
            vietnameseMeaning: "Tôi không bao giờ thức khuya, 10h30 là ngủ rồi, sáng ra rất tỉnh táo."
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Đoạn 4",
        chineseSubtitle: "身心平衡与健康秘诀",
        pinyinSubtitle: "Shēnxīn pínghéng yǔ jiànkāng mìjué",
        vietnameseSubtitle: "Cân bằng thân tâm & Bí quyết sống khỏe",
        keyGrammar: "比以前更健康 / 坚持就是胜利",
        dialogueHighlights: [
          {
            teacherQuestion: "坚持锻炼让你有什么改变？",
            pinyinQuestion: "Jiānchí duànliàn ràng nǐ yǒu shénme gǎibiàn?",
            studentAnswer: "我现在很少生病，比以前更健康、更有活力了！",
            pinyinAnswer: "Wǒ xiànzài hěn shǎo shēngbìng, bǐ yǐqián gèng jiànkāng, gèng yǒu huólì le!",
            vietnameseMeaning: "Bây giờ tôi rất ít ốm, khỏe mạnh và tràn đầy sức sống hơn trước!"
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 13,
    internalLessonIndex: 13,
    title: "Khám bệnh",
    chineseTitle: "看病与遵医嘱",
    pinyin: "Kànbìng yǔ zūn yīzhǔ",
    theme: "Triệu chứng bệnh & Lời dặn của bác sĩ",
    summary: "Hội thoại đi bệnh viện, miêu tả triệu chứng sốt, ho, đau đầu và cách uống thuốc đúng liều lượng.",
    grammarPoints: [
      "Miêu tả chỗ đau: 哪儿不舒服？ (Khó chịu ở đâu?).",
      "Liều lượng uống thuốc: 一天三次，一次两片 (Ngày 3 lần, mỗi lần 2 viên).",
      "Lời khuyên: 多喝水，多休息 (Uống nhiều nước, nghỉ ngơi nhiều)."
    ],
    vocabulary: [
      { hanzi: "发烧", pinyin: "fāshāo", meaning: "phát sốt" },
      { hanzi: "感冒", pinyin: "gǎnmào", meaning: "cảm cúm" },
      { hanzi: "按时吃药", pinyin: "ànshí chīyào", meaning: "uống thuốc đúng giờ" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "你怎么了？哪儿不舒服？",
        pinyinQuestion: "Nǐ zěnme le? Nǎr bù shūfu?",
        studentAnswer: "我头疼，嗓子也疼，可能有点儿发烧。",
        pinyinAnswer: "Wǒ tóuténg, sǎngzi yě téng, kěnéng yǒudiǎnr fāshāo.",
        vietnameseMeaning: "Tôi đau đầu, đau cả họng, hình như hơi sốt."
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Đoạn 1",
        chineseSubtitle: "描述身体不适与症状",
        pinyinSubtitle: "Miáoshù shēntǐ búshì yǔ zhèngzhuàng",
        vietnameseSubtitle: "Miêu tả cảm giác đau nhức & Triệu chứng",
        keyGrammar: "哪儿不舒服？ / 头疼嗓子疼有点儿发烧",
        dialogueHighlights: [
          {
            teacherQuestion: "你怎么了？哪儿不舒服？",
            pinyinQuestion: "Nǐ zěnme le? Nǎr bù shūfu?",
            studentAnswer: "我头疼，嗓子也疼，可能有点儿发烧。",
            pinyinAnswer: "Wǒ tóuténg, sǎngzi yě téng, kěnéng yǒudiǎnr fāshāo.",
            vietnameseMeaning: "Tôi đau đầu, đau họng, hình như hơi sốt."
          }
        ]
      },
      {
        sectionNumber: 2,
        title: "Đoạn 2",
        chineseSubtitle: "量体温与医生确诊",
        pinyinSubtitle: "Liáng tǐwēn yǔ yīshēng quèzhěn",
        vietnameseSubtitle: "Đo nhiệt độ cơ thể & Bác sĩ chẩn đoán",
        keyGrammar: "三十八度五 / 得了感冒",
        dialogueHighlights: [
          {
            teacherQuestion: "量一下体温，三十八度五，你感冒了。",
            pinyinQuestion: "Liáng yíxià tǐwēn, sānshíbā dù wǔ, nǐ gǎnmào le.",
            studentAnswer: "医生，需要打针吗？",
            pinyinAnswer: "Yīshēng, xūyào dǎzhēn ma?",
            vietnameseMeaning: "Bác sĩ ơi, có cần tiêm không ạ?"
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Đoạn 3",
        chineseSubtitle: "开药与按时服药说明",
        pinyinSubtitle: "Kāiyào yǔ ànshí fúyào shuōmíng",
        vietnameseSubtitle: "Kê đơn & Hướng dẫn uống thuốc đúng giờ",
        keyGrammar: "一天三次，一次两片 / 饭后吃",
        dialogueHighlights: [
          {
            teacherQuestion: "不用打针，吃点儿药就行。一天三次，一次两片。",
            pinyinQuestion: "Bú yòng dǎzhēn, chī diǎnr yào jiù xíng. Yì tiān sān cì, yí cì liǎng piàn.",
            studentAnswer: "好的，是饭前吃还是饭后吃？",
            pinyinAnswer: "Hǎo de, shì fàn qián chī hái shì fàn hòu chī?",
            vietnameseMeaning: "Vâng, uống trước bữa ăn hay sau bữa ăn ạ?"
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Đoạn 4",
        chineseSubtitle: "医嘱叮咛与早日康复",
        pinyinSubtitle: "Yīzhǔ dīngníng yǔ zǎorì kāngfù",
        vietnameseSubtitle: "Lời dặn dò của bác sĩ & Mau bình phục",
        keyGrammar: "多喝水，多休息 / 祝你早日康复",
        dialogueHighlights: [
          {
            teacherQuestion: "饭后吃。记得多喝水，好好休息两天。",
            pinyinQuestion: "Fàn hòu chī. Jìde duō hē shuǐ, hǎohāo xiūxi liǎng tiān.",
            studentAnswer: "谢谢医生，我会按时吃药的。",
            pinyinAnswer: "Xièxie yīshēng, wǒ huì ànshí chīyào de.",
            vietnameseMeaning: "Cảm ơn bác sĩ, tôi sẽ uống thuốc đúng giờ."
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 14,
    internalLessonIndex: 14,
    title: "Kế hoạch tương lai",
    chineseTitle: "未来打算与职业规划",
    pinyin: "Wèilái dǎsuan yǔ zhíyè guīhuà",
    theme: "Dự định công việc & Hoài bão",
    summary: "Bày tỏ ước mơ, dự định sau khi tốt nghiệp, muốn làm việc tại công ty đa quốc gia hoặc học lên thạc sĩ.",
    grammarPoints: [
      "Biểu đạt dự định: 打算 / 准备 / 希望.",
      "Thời gian trong tương lai: 毕业以后, 明年.",
      "Nguyện vọng: 当一名翻译 / 创业."
    ],
    vocabulary: [
      { hanzi: "毕业", pinyin: "bìyè", meaning: "tốt nghiệp" },
      { hanzi: "打算", pinyin: "dǎsuan", meaning: "dự định" },
      { hanzi: "翻译", pinyin: "fānyì", meaning: "phiên dịch viên" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "毕业以后你有什么打算？",
        pinyinQuestion: "Bìyè yǐhòu nǐ yǒu shénme dǎsuan?",
        studentAnswer: "我打算去一家外贸公司当汉语翻译。",
        pinyinAnswer: "Wǒ dǎsuan qù yì jiā wàimào gōngsī dāng hànyǔ fānyì.",
        vietnameseMeaning: "Tôi dự định đến một công ty ngoại thương làm phiên dịch tiếng Trung."
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Đoạn 1",
        chineseSubtitle: "毕业打算与人生抉择",
        pinyinSubtitle: "Bìyè dǎsuan yǔ rénshēng juézé",
        vietnameseSubtitle: "Dự định sau tốt nghiệp & Lựa chọn tương lai",
        keyGrammar: "毕业以后打算... / 当一名翻译",
        dialogueHighlights: [
          {
            teacherQuestion: "毕业以后你有什么打算？",
            pinyinQuestion: "Bìyè yǐhòu nǐ yǒu shénme dǎsuan?",
            studentAnswer: "我打算去一家外贸公司当汉语翻译。",
            pinyinAnswer: "Wǒ dǎsuan qù yì jiā wàimào gōngsī dāng hànyǔ fānyì.",
            vietnameseMeaning: "Tốt nghiệp xong tôi định vào một công ty ngoại thương làm phiên dịch tiếng Trung."
          }
        ]
      },
      {
        sectionNumber: 2,
        title: "Đoạn 2",
        chineseSubtitle: "求职外企与发挥特长",
        pinyinSubtitle: "Qiúzhí wàiqǐ yǔ fāhuī tècháng",
        vietnameseSubtitle: "Ứng tuyển công ty nước ngoài & Phát huy sở trường",
        keyGrammar: "发挥语言特长 / 很有挑战性",
        dialogueHighlights: [
          {
            teacherQuestion: "为什么想去外贸公司？",
            pinyinQuestion: "Wèishénme xiǎng qù wàimào gōngsī?",
            studentAnswer: "因为那里能经常跟中国人交流，发挥我的汉语特长。",
            pinyinAnswer: "Yīnwèi nàlǐ néng jīngcháng gēn Zhōngguórén jiāoliú, fāhuī wǒ de hànyǔ tècháng.",
            vietnameseMeaning: "Vì ở đó tôi có thể thường xuyên giao lưu với người Trung Quốc và phát huy vốn tiếng Trung."
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Đoạn 3",
        chineseSubtitle: "深造读研与提升能力",
        pinyinSubtitle: "Shēnzào dòuyán yǔ tíshēng nénglì",
        vietnameseSubtitle: "Học lên thạc sĩ & Nâng cao năng lực",
        keyGrammar: "打算考研究生 / 继续深造",
        dialogueHighlights: [
          {
            teacherQuestion: "你考虑过继续读研究生吗？",
            pinyinQuestion: "Nǐ kǎolǜ guò jìxù dú yánjiūshēng ma?",
            studentAnswer: "工作两年积累经验后，我也希望能读国际贸易硕士。",
            pinyinAnswer: "Gōngzuò liǎng nián jīlěi jīngyàn hòu, wǒ yě xīwàng néng dú guójì màoyì shuòshì.",
            vietnameseMeaning: "Sau khi đi làm 2 năm tích lũy kinh nghiệm, tôi cũng mong muốn học thạc sĩ thương mại quốc tế."
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Đoạn 4",
        chineseSubtitle: "美好祝愿与勇往直前",
        pinyinSubtitle: "Měihǎo zhùyuàn yǔ yǒngwǎng zhíqián",
        vietnameseSubtitle: "Lời chúc tốt lành & Vững bước tiến xa",
        keyGrammar: "祝你梦想成真 / 一定会成功",
        dialogueHighlights: [
          {
            teacherQuestion: "祝你早日实现理想，前程似锦！",
            pinyinQuestion: "Zhù nǐ zǎorì shíxiàn lǐxiǎng, qiánchéng sì jǐn!",
            studentAnswer: "非常感谢老师的鼓励，我会一直努力的！",
            pinyinAnswer: "Fēicháng gǎnxiè lǎoshī de gǔlì, wǒ huì yìzhí nǔlì de!",
            vietnameseMeaning: "Cảm ơn sự động viên của thầy cô, em sẽ luôn nỗ lực không ngừng!"
          }
        ]
      }
    ]
  },
  {
    lessonNumber: 15,
    internalLessonIndex: 15,
    title: "Ôn tập",
    chineseTitle: "总复习与综合会话",
    pinyin: "Zǒng fùxí yǔ zōnghé huìhuà",
    theme: "Tổng kết 15 bài & Phản xạ lưu loát",
    summary: "Tổng hợp toàn bộ các mẫu câu trọng điểm từ Bài 1 đến Bài 14, luyện phản xạ tự nhiên đa tình huống với giáo viên AI.",
    grammarPoints: [
      "Ôn tập toàn diện: 正在, 了, 过, 着.",
      "Bổ ngữ trạng thái, khả năng, xu hướng.",
      "Kỹ năng đối đáp tự tin và chuẩn phát âm Bắc Kinh."
    ],
    vocabulary: [
      { hanzi: "复习", pinyin: "fùxí", meaning: "ôn tập" },
      { hanzi: "流利", pinyin: "liúlì", meaning: "lưu loát" },
      { hanzi: "进步", pinyin: "jìnbù", meaning: "tiến bộ" }
    ],
    dialogueHighlights: [
      {
        teacherQuestion: "学了十五课，你觉得自己的汉语进步大吗？",
        pinyinQuestion: "Xué le shíwǔ kè, nǐ juéde zìjǐ de hànyǔ jìnbù dà ma?",
        studentAnswer: "我进步很大，现在能用汉语和AI老师自信交流了！",
        pinyinAnswer: "Wǒ jìnbù hěn dà, xiànzài néng yòng hànyǔ hé AI lǎoshī zìxìn jiāoliú le!",
        vietnameseMeaning: "Tôi tiến bộ rất nhiều, bây giờ có thể tự tin giao tiếp tiếng Trung cùng giáo viên AI rồi!"
      }
    ],
    sections: [
      {
        sectionNumber: 1,
        title: "Đoạn 1",
        chineseSubtitle: "日常交际与问候句型复习",
        pinyinSubtitle: "Rìcháng jiāojì yǔ wènhòu jùxíng fùxí",
        vietnameseSubtitle: "Ôn tập hội thoại giao tiếp thường nhật",
        keyGrammar: "问候、介绍与日常活动表达",
        dialogueHighlights: [
          {
            teacherQuestion: "学了十五课，你觉得自己的汉语进步大吗？",
            pinyinQuestion: "Xué le shíwǔ kè, nǐ juéde zìjǐ de hànyǔ jìnbù dà ma?",
            studentAnswer: "我进步很大，现在能用汉语和AI老师自信交流了！",
            pinyinAnswer: "Wǒ jìnbù hěn dà, xiànzài néng yòng hànyǔ hé AI lǎoshī zìxìn jiāoliú le!",
            vietnameseMeaning: "Tôi tiến bộ rất nhiều, bây giờ đã có thể tự tin trò chuyện cùng giáo viên AI rồi!"
          }
        ]
      },
      {
        sectionNumber: 2,
        title: "Đoạn 2",
        chineseSubtitle: "动态助词与时态综合复习",
        pinyinSubtitle: "Dòngtài zhùcí yǔ shítài zōnghé fùxí",
        vietnameseSubtitle: "Ôn tập tổng hợp trợ từ '了', '过', '着'",
        keyGrammar: "完成态、经历态与持续态对比",
        dialogueHighlights: [
          {
            teacherQuestion: "你能区分“了”、“过”和“着”的用法吗？",
            pinyinQuestion: "Nǐ néng qūfēn 'le', 'guò' hé 'zhe' de yòngfǎ ma?",
            studentAnswer: "能！'了'表完成或变化，'过'表曾经的经验，'着'表动作状态的持续。",
            pinyinAnswer: "Néng! 'le' biǎo wánchéng huò biànhuà, 'guò' biǎo céngjīng de jīngyàn, 'zhe' biǎo dòngzuò zhuàngtài de chíxù.",
            vietnameseMeaning: "Hiểu rõ! '了' chỉ hoàn thành hoặc biến chuyển, '过' chỉ kinh nghiệm đã qua, '着' chỉ trạng thái đang tiếp diễn."
          }
        ]
      },
      {
        sectionNumber: 3,
        title: "Đoạn 3",
        chineseSubtitle: "方向补语与可能补语突破",
        pinyinSubtitle: "Fāngxiàng bǔyǔ yǔ kěnéng bǔyǔ tūpò",
        vietnameseSubtitle: "Đột phá bổ ngữ xu hướng & Bổ ngữ khả năng",
        keyGrammar: "听得懂 / 寄回去 / 搬下楼去",
        dialogueHighlights: [
          {
            teacherQuestion: "现在听中国人正常说话你能听得懂吗？",
            pinyinQuestion: "Xiànzài tīng Zhōngguórén zhèngcháng shuōhuà nǐ néng tīngdedǒng ma?",
            studentAnswer: "大部分日常话题我都听得懂，也能流利回答！",
            pinyinAnswer: "Dà bùfen rìcháng huàtí wǒ dōu tīngdedǒng, yě néng liúlì huídá!",
            vietnameseMeaning: "Đại đa số các chủ đề hàng ngày tôi đều nghe hiểu được và trả lời lưu loát!"
          }
        ]
      },
      {
        sectionNumber: 4,
        title: "Đoạn 4",
        chineseSubtitle: "实战综合反应与流利交流",
        pinyinSubtitle: "Shízhàn zōnghé fǎnyìng yǔ liúlì jiāoliú",
        vietnameseSubtitle: "Phản xạ thực chiến toàn diện & Lưu loát tự nhiên",
        keyGrammar: "流利表达 / 自信交流 / 恭喜结业",
        dialogueHighlights: [
          {
            teacherQuestion: "恭喜你完成了整整60页的全部课程！",
            pinyinQuestion: "Gōngxǐ nǐ wánchéng le zhěngzhěng liùshí yè de quánbù kèchéng!",
            studentAnswer: "太棒了！感谢AI老师一路以来的耐心辅导！",
            pinyinAnswer: "Tài bàng le! Gǎnxiè AI lǎoshī yílù yǐlái de nàixīn fǔdǎo!",
            vietnameseMeaning: "Tuyệt vời quá! Cảm ơn giáo viên AI đã đồng hành kiên nhẫn hướng dẫn!"
          }
        ]
      }
    ]
  }
];

export const TOTAL_BOOK_PAGES = 96; // 96 trang: Trang 1 đến 6 (6 trang Bài mở đầu nhúng link), Trang 7 đến 96 (15 Bài học, mỗi bài 6 trang)

export interface BookPageItem {
  pageNumber: number;
  lessonNumber: number;
  type: 'Dịch câu' | 'Giao tiếp' | 'Bài khóa' | 'Từ vựng' | 'Bài mở đầu' | 'Trống';
  title: string;
}

// List of pages (Trang 1 đến Trang 96)
export const BOOK_PAGES_LIST: BookPageItem[] = [
  { pageNumber: 1, lessonNumber: 0, type: 'Bài mở đầu', title: 'Bài mở đầu: Phụ âm' },
  { pageNumber: 2, lessonNumber: 0, type: 'Bài mở đầu', title: 'Bài mở đầu: Nguyên âm' },
  { pageNumber: 3, lessonNumber: 0, type: 'Bài mở đầu', title: 'Bài mở đầu: Ghép âm 1' },
  { pageNumber: 4, lessonNumber: 0, type: 'Bài mở đầu', title: 'Bài mở đầu: Ghép âm 2' },
  { pageNumber: 5, lessonNumber: 0, type: 'Bài mở đầu', title: 'Bài mở đầu: Ghép âm 3' },
  { pageNumber: 6, lessonNumber: 0, type: 'Bài mở đầu', title: 'Bài mở đầu: Ghép âm 4' },
  ...Array.from({ length: 15 }, (_, i) => {
    const lessonNum = i + 1;
    const base = 7 + i * 6;
    return [
      { pageNumber: base, lessonNumber: lessonNum, type: 'Từ vựng' as any, title: `Từ vựng ${lessonNum}` },
      { pageNumber: base + 1, lessonNumber: lessonNum, type: 'Bài khóa' as any, title: `Gõ từ vựng ${lessonNum}` },
      { pageNumber: base + 2, lessonNumber: lessonNum, type: 'Bài khóa' as any, title: `Gõ bài khóa ${lessonNum}` },
      { pageNumber: base + 3, lessonNumber: lessonNum, type: 'Bài khóa' as any, title: `Bài khóa ${lessonNum}` },
      { pageNumber: base + 4, lessonNumber: lessonNum, type: 'Dịch câu' as any, title: `Bài ${lessonNum} Dịch câu` },
      { pageNumber: base + 5, lessonNumber: lessonNum, type: 'Giao tiếp' as any, title: `Bài ${lessonNum} Giao tiếp` }
    ];
  }).flat()
];

export interface PageInfo {
  pageIndex: number; // 1 to 96
  lessonIndex: number;
  lessonNumber: number;
  sectionNumber: number;
  lesson: LessonData;
  section: LessonSection;
  pageTitle: string;
}

const MAIN_PAGE_TITLES: Record<number, string> = (() => {
  const titles: Record<number, string> = {
    1: "Bài mở đầu: Phụ âm",
    2: "Bài mở đầu: Nguyên âm",
    3: "Bài mở đầu: Ghép âm 1",
    4: "Bài mở đầu: Ghép âm 2",
    5: "Bài mở đầu: Ghép âm 3",
    6: "Bài mở đầu: Ghép âm 4"
  };
  for (let l = 1; l <= 15; l++) {
    const base = 7 + (l - 1) * 6;
    titles[base] = `Từ vựng ${l}`;
    titles[base + 1] = `Gõ từ vựng ${l}`;
    titles[base + 2] = `Gõ bài khóa ${l}`;
    titles[base + 3] = `Bài khóa ${l}`;
    titles[base + 4] = `Bài ${l} Dịch câu`;
    titles[base + 5] = `Bài ${l} Giao tiếp`;
  }
  return titles;
})();

const EMBEDDED_PAGE_METADATA: Record<number, { lessonNumber: number; lessonIndex: number; title: string; chineseTitle: string; pinyin: string; url: string }> = (() => {
  const meta: Record<number, { lessonNumber: number; lessonIndex: number; title: string; chineseTitle: string; pinyin: string; url: string }> = {};
  
  // 6 Trang thuộc "Bài mở đầu" (Trang 1 đến 6)
  meta[1] = {
    lessonNumber: 0,
    lessonIndex: 0,
    title: "Bài mở đầu: Phụ âm",
    chineseTitle: "绪论：声母",
    pinyin: "Xùlùn: Shēngmǔ",
    url: "https://tiengtrungbachai.online/modau/phuam.html"
  };
  meta[2] = {
    lessonNumber: 0,
    lessonIndex: 0,
    title: "Bài mở đầu: Nguyên âm",
    chineseTitle: "绪论：韵母",
    pinyin: "Xùlùn: Yùnmǔ",
    url: "https://tiengtrungbachai.online/modau/nguyenam.html"
  };
  meta[3] = {
    lessonNumber: 0,
    lessonIndex: 0,
    title: "Bài mở đầu: Ghép âm 1",
    chineseTitle: "绪论：拼读一",
    pinyin: "Xùlùn: Pīndú yī",
    url: "https://tiengtrungbachai.online/modau/ghepam1.html"
  };
  meta[4] = {
    lessonNumber: 0,
    lessonIndex: 0,
    title: "Bài mở đầu: Ghép âm 2",
    chineseTitle: "绪论：拼读二",
    pinyin: "Xùlùn: Pīndú èr",
    url: "https://tiengtrungbachai.online/modau/ghepam2.html"
  };
  meta[5] = {
    lessonNumber: 0,
    lessonIndex: 0,
    title: "Bài mở đầu: Ghép âm 3",
    chineseTitle: "绪论：拼读三",
    pinyin: "Xùlùn: Pīndú sān",
    url: "https://tiengtrungbachai.online/modau/ghepam3.html"
  };
  meta[6] = {
    lessonNumber: 0,
    lessonIndex: 0,
    title: "Bài mở đầu: Ghép âm 4",
    chineseTitle: "绪论：拼读四",
    pinyin: "Xùlùn: Pīndú sì",
    url: "https://tiengtrungbachai.online/modau/ghepam4.html"
  };

  const chineseNumbers = ["", "yī", "èr", "sān", "sì", "wǔ", "liù", "qī", "bā", "jiǔ", "shí", "shíyī", "shí'èr", "shísān", "shísì", "shíwǔ"];
  const hanziNumbers = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五"];

  for (let l = 1; l <= 15; l++) {
    const base = 7 + (l - 1) * 6;
    const lIdx = Math.floor((l - 1) / 2);
    const hz = hanziNumbers[l] || String(l);
    const py = chineseNumbers[l] || String(l);

    meta[base] = {
      lessonNumber: l,
      lessonIndex: lIdx,
      title: `Từ vựng ${l}`,
      chineseTitle: `第${hz}课 词汇`,
      pinyin: `Dì ${py} kè cíhuì`,
      url: `https://tiengtrungbachai.online/TrungHanyukouyu/amboikouyu1/kouyu1tuvung${l}.html`
    };
    meta[base + 1] = {
      lessonNumber: l,
      lessonIndex: lIdx,
      title: `Gõ từ vựng ${l}`,
      chineseTitle: `第${hz}课 词汇打字`,
      pinyin: `Dì ${py} kè cíhuì dǎzì`,
      url: `https://kouyu1gotuvungbaikhoa.netlify.app/kouyu1gotuvung${l}.html`
    };
    meta[base + 2] = {
      lessonNumber: l,
      lessonIndex: lIdx,
      title: `Gõ bài khóa ${l}`,
      chineseTitle: `第${hz}课 课文打字`,
      pinyin: `Dì ${py} kè kèwén dǎzì`,
      url: `https://kouyu1gotuvungbaikhoa.netlify.app/kouyu1gobaikhoa${l}.html`
    };
    meta[base + 3] = {
      lessonNumber: l,
      lessonIndex: lIdx,
      title: `Bài khóa ${l}`,
      chineseTitle: `第${hz}课 课文`,
      pinyin: `Dì ${py} kè kèwén`,
      url: `https://tiengtrungbachai.online/TrungHanyukouyu/amboikouyu1/kouyu1baikhoa${l}.html`
    };
  }
  return meta;
})();

export function getPageInfo(pageIndex: number): PageInfo | null {
  if (pageIndex < 1 || pageIndex > TOTAL_BOOK_PAGES) return null;

  // Embedded Link Pages (Bài mở đầu & Bài 1 đến 15)
  if (EMBEDDED_PAGE_METADATA[pageIndex]) {
    const meta = EMBEDDED_PAGE_METADATA[pageIndex];
    const embeddedLesson: LessonData = {
      lessonNumber: meta.lessonNumber,
      internalLessonIndex: meta.lessonNumber,
      title: meta.title,
      chineseTitle: meta.chineseTitle,
      pinyin: meta.pinyin,
      theme: meta.title,
      summary: `${meta.title} trực tuyến: ${meta.url}`,
      grammarPoints: [],
      vocabulary: [],
      dialogueHighlights: [],
      sections: [
        {
          sectionNumber: 1,
          title: meta.title,
          chineseSubtitle: meta.chineseTitle,
          vietnameseSubtitle: meta.title,
          dialogueHighlights: []
        }
      ]
    };
    return {
      pageIndex,
      lessonIndex: meta.lessonIndex,
      lessonNumber: meta.lessonNumber,
      sectionNumber: 1,
      lesson: embeddedLesson,
      section: embeddedLesson.sections[0],
      pageTitle: meta.title
    };
  }

  // Pages for Lessons 1 to 15 (Dịch câu & Giao tiếp)
  for (let lNum = 1; lNum <= 15; lNum++) {
    const base = 7 + (lNum - 1) * 6;
    const dcPage = base + 4;
    const gtPage = base + 5;
    if (pageIndex === dcPage || pageIndex === gtPage) {
      const isEven = lNum % 2 === 0;
      const lessonIndex = Math.floor((lNum - 1) / 2);
      const sectionNumber = pageIndex === dcPage ? (isEven ? 3 : 1) : (isEven ? 4 : 2);
      const lesson = LESSONS_DATA[lessonIndex] || LESSONS_DATA[0];
      const section = lesson.sections[sectionNumber - 1] || lesson.sections[0];
      return {
        pageIndex,
        lessonIndex,
        lessonNumber: lNum,
        sectionNumber,
        lesson,
        section,
        pageTitle: MAIN_PAGE_TITLES[pageIndex] || (pageIndex === dcPage ? `Bài ${lNum} Dịch câu` : `Bài ${lNum} Giao tiếp`)
      };
    }
  }

  return null;
}

export function getPageNumberForLessonSection(lessonNumber: number, sectionNumber: number = 1): number {
  const lessonNum = Math.max(1, Math.min(15, lessonNumber));
  const base = 7 + (lessonNum - 1) * 6;
  if (sectionNumber === 0) return base;
  return sectionNumber === 2 ? base + 5 : base + 4;
}
