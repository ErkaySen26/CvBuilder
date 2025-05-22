import React, { useState } from "react";
import styles from "./ChatBot.module.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const faqResponses: { [key: string]: string } = {
    "cv nasıl oluşturulur": "Profil bilgilerinizi girdikten sonra bir şablon seçerek CV'nizi oluşturabilirsiniz.",
        "şablon değiştirebilir miyim": "Evet, istediğiniz zaman farklı bir şablona geçebilirsiniz.",
        "cv'yi nasıl indiririm": "CV'nizi oluşturduktan sonra PDF olarak indirebilirsiniz.",
        "giriş yapmadan cv oluşturabilir miyim": "Hayır, önce giriş yapmanız gerekmektedir.",
        "profil fotoğrafı nasıl yüklenir": "Profil → Düzenle bölümünden fotoğraf yükleme alanını kullanarak resminizi ekleyebilirsiniz.",
        "deneyim nasıl eklenir": "Profil → Deneyim sekmesinde şirket adı, pozisyon ve tarihleri girip “Ekle” butonuna tıklayın.",
        "eğitim nasıl eklenir": "Profil → Eğitim sekmesinden okul, bölüm ve tarih bilgilerini girip kaydedin.",
        "yetenek nasıl eklenir": "Profil → Yetenekler sekmesinde yeteneği yazıp seviye seçtikten sonra “Ekle”ye basın.",
        "sosyal link nasıl eklenir": "Profil → Sosyal bağlantılar bölümüne platform adı ve URL girerek ekleyebilirsiniz.",
        "ön izleme nasıl yapılır": "CV oluşturma adımlarını tamamladıktan sonra “Ön İzle” butonuna tıklayarak görüntüleyebilirsiniz.",
        "taslağı kaydedebilir miyim": "Yaptığınız değişiklikler otomatik kaydedilir; Profil → Taslaklar kısmından geri dönebilirsiniz.",
        "cv'yi word olarak indirebilir miyim": "Şu anda yalnızca PDF indirme desteğimiz var, Word formatı yakında ekleniyor.",
        "tasarımı nasıl özelleştirebilirim": "Seçtiğiniz şablon için renk ve font seçeneklerini sağ panelden düzenleyebilirsiniz.",
        "şifre nasıl sıfırlanır": "Şifre sıfırlama özelliğimiz henüz bulunmuyor; yakında eklemeyi planlıyoruz.",
        "hesabımı nasıl silerim": "Hesap silme işlemleri için destek@cvmaker.com adresine e-posta gönderebilirsiniz.",
        "mobilde nasıl kullanırım": "Mobil uyumlu web sürümümüzü tarayıcınızdan açarak tüm özelliklere erişebilirsiniz.",
        "ücretli mi?": "Temel özellikler tamamen ücretsizdir; yakın gelecekte Premium abonelik sunacağız.",
        "destek nasıl alabilirim": "Her türlü soru ve talebiniz için destek@cvmaker.com üzerinden bize ulaşabilirsiniz.",
        "merhaba": "Merhaba! Size nasıl yardımcı olabilirim?",
        "selam": "Selam! Bir sorunuz varsa hemen cevaplayayım.",
        "naber": "Her şey yolunda, teşekkürler! Siz nasılsınız?",
        "nasılsın": "İyiyim, teşekkür ederim! Siz nasılsınız?",
        "iyi günler": "İyi günler! Size bugün nasıl yardımcı olabilirim?",
        "iyi akşamlar": "İyi akşamlar! Sorularınız için buradayım.",
        "teşekkürler": "Rica ederim 😊 Başka bir konuda yardımcı olabilir miyim?",
        "sağ ol": "Memnuniyetle! Başka bir sorunuz var mı?",
        "yardım": "Tabii, ne konuda yardım istersiniz?",
        "yardım edebilir misin": "Elbette, lütfen ne hakkında bilgi almak istediğinizi yazın.",
        "bilgi alabilir miyim": "Hangi konuda bilgi almak istediğinizi belirtir misiniz?",
        "görüşürüz": "Görüşmek üzere! Tekrar beklerim.",
        "hoşçakal": "Hoşçakalın! İyi günler dilerim.",
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim().toLowerCase();
    const response = faqResponses[userMsg] || "Maalesef bu soruya cevap veremiyorum.";

    setMessages((prev) => [...prev, `🧑‍💻: ${input}`, `🤖: ${response}`]);
    setInput("");
  };

  return (
    <div className={styles.chatContainer}>
      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>Chat Bot</div>
          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => (
              <div key={idx} className={styles.chatMessage}>{msg}</div>
            ))}
          </div>
          <div className={styles.chatInput}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Bir şey sor..."
            />
            <button onClick={handleSend}>Gönder</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className={styles.toggleButton}>
        💬
      </button>
    </div>
  );
};

export default ChatBot;
