const I18N_ENGINE = {
    CURRENT_LANG: 'EN', // DEFAULT SYSTEM LANGUAGE
    
    DICTIONARY: {
        EN: {
            MENU_SETTINGS: "SETTINGS",
            SELECT_LANG: "SELECT LANGUAGE",
            BTN_ACCOUNT: "ACCOUNT",
            MODE_MULTIPLAYER: "MULTIPLAYER",
            MODE_PRIVATE: "PRIVATE ROOM",
            MODE_BOT: "BOT MATCH",
            TITLE_ELIMINATED: "ELIMINATED",
            STAT_SCORE: "FINAL SCORE",
            BTN_RETURN: "RETURN TO GAME",
            BTN_LOBBY: "GO TO LOBBY"
        },
        HE: { // HEBREW (RTL)
            MENU_SETTINGS: "הגדרות",
            SELECT_LANG: "בחר שפה",
            BTN_ACCOUNT: "חשבון",
            MODE_MULTIPLAYER: "מרובה משתתפים",
            MODE_PRIVATE: "חדר פרטי",
            MODE_BOT: "משחק בוטים",
            TITLE_ELIMINATED: "נפסלת",
            STAT_SCORE: "ניקוד סופי",
            BTN_RETURN: "חזור למשחק",
            BTN_LOBBY: "חזור ללובי"
        },
        AR: { // ARABIC (RTL)
            MENU_SETTINGS: "الإعدادات",
            SELECT_LANG: "اختر اللغة",
            BTN_ACCOUNT: "الحساب",
            MODE_MULTIPLAYER: "لاعبين متعددين",
            MODE_PRIVATE: "غرفة خاصة",
            MODE_BOT: "مباراة بوت",
            TITLE_ELIMINATED: "تم إقصاؤك",
            STAT_SCORE: "النتيجة النهائية",
            BTN_RETURN: "العودة للعبة",
            BTN_LOBBY: "الذهاب לרש_ة"
        },
        ES: { // SPANISH
            MENU_SETTINGS: "CONFIGURACIÓN",
            SELECT_LANG: "SELECCIONAR IDIOMA",
            BTN_ACCOUNT: "CUENTA",
            MODE_MULTIPLAYER: "MULTIJUGADOR",
            MODE_PRIVATE: "SALA PRIVADA",
            MODE_BOT: "PARTIDA DE BOTS",
            TITLE_ELIMINATED: "ELIMINADO",
            STAT_SCORE: "PUNTUACIÓN FINAL",
            BTN_RETURN: "VOLVER AL JUEGO",
            BTN_LOBBY: "IR AL LOBBY"
        },
        FR: { // FRENCH
            MENU_SETTINGS: "PARAMÈTRES",
            SELECT_LANG: "CHOISIR LA LANGUE",
            BTN_ACCOUNT: "COMPTE",
            MODE_MULTIPLAYER: "MULTIJOUEUR",
            MODE_PRIVATE: "SALLE PRIVÉE",
            MODE_BOT: "PARTIE DE BOTS",
            TITLE_ELIMINATED: "ÉLIMINÉ",
            STAT_SCORE: "SCORE FINAL",
            BTN_RETURN: "RETOURNER AU JEU",
            BTN_LOBBY: "ALLER AU LOBBY"
        },
        DE: { // GERMAN
            MENU_SETTINGS: "EINSTELLUNGEN",
            SELECT_LANG: "SPRACHE AUSWÄHLEN",
            BTN_ACCOUNT: "KONTO",
            MODE_MULTIPLAYER: "MEHRSPIELER",
            MODE_PRIVATE: "PRIVATER RAUM",
            MODE_BOT: "BOT-MATCH",
            TITLE_ELIMINATED: "ELIMINIERT",
            STAT_SCORE: "ENDSTAND",
            BTN_RETURN: "ZURÜCK ZUM SPIEL",
            BTN_LOBBY: "ZUR LOBBY"
        },
        PT: { // PORTUGUESE
            MENU_SETTINGS: "CONFIGURAÇÕES",
            SELECT_LANG: "SELECIONAR IDIOMA",
            BTN_ACCOUNT: "CONTA",
            MODE_MULTIPLAYER: "MULTIJOGADOR",
            MODE_PRIVATE: "SALA PRIVADA",
            MODE_BOT: "PARTIDA DE BOTS",
            TITLE_ELIMINATED: "ELIMINADO",
            STAT_SCORE: "PONTUAÇÃO FINAL",
            BTN_RETURN: "VOLVER AO JOGO",
            BTN_LOBBY: "IR PARA O LOBBY"
        },
        IT: { // ITALIAN
            MENU_SETTINGS: "IMPOSTAZIONI",
            SELECT_LANG: "SELEZIONA LINGUA",
            BTN_ACCOUNT: "ACCOUNT",
            MODE_MULTIPLAYER: "MULTIGIOCATORE",
            MODE_PRIVATE: "STANZA PRIVATA",
            MODE_BOT: "PARTITA BOT",
            TITLE_ELIMINATED: "ELIMINATO",
            STAT_SCORE: "PUNTEGGIO FINALE",
            BTN_RETURN: "TORNA AL GIOCO",
            BTN_LOBBY: "VAI ALLA LOBBY"
        },
        RU: { // RUSSIAN
            MENU_SETTINGS: "НАСТРОЙКИ",
            SELECT_LANG: "ВЫБЕРИТЕ ЯЗЫК",
            BTN_ACCOUNT: "АККАУНТ",
            MODE_MULTIPLAYER: "МУЛЬТИПЛЕЕР",
            MODE_PRIVATE: "ПРИВАТНАЯ КОМНАТА",
            MODE_BOT: "МАТЧ С БОТАМИ",
            TITLE_ELIMINATED: "ЛИКВИДИРОВАН",
            STAT_SCORE: "ФИНАЛЬНЫЙ СЧЕТ",
            BTN_RETURN: "ВЕРНУТЬСЯ В ИГРУ",
            BTN_LOBBY: "В ЛОББИ"
        },
        TR: { // TURKISH
            MENU_SETTINGS: "AYARLAR",
            SELECT_LANG: "DİL SEÇİN",
            BTN_ACCOUNT: "HESAP",
            MODE_MULTIPLAYER: "ÇOK OYUNCULU",
            MODE_PRIVATE: "ÖZEL ODA",
            MODE_BOT: "BOT MAÇI",
            TITLE_ELIMINATED: "ELENDİ",
            STAT_SCORE: "TOPLAM SKOR",
            BTN_RETURN: "OYUNA DÖN",
            BTN_LOBBY: "LOBİYE GİT"
        },
        JA: { // JAPANESE
            MENU_SETTINGS: "設定",
            SELECT_LANG: "言語選択",
            BTN_ACCOUNT: "アカウント",
            MODE_MULTIPLAYER: "マルチプレイヤー",
            MODE_PRIVATE: "プライベートルーム",
            MODE_BOT: "ボットマッチ",
            TITLE_ELIMINATED: "脱落しました",
            STAT_SCORE: "最終スコア",
            BTN_RETURN: "ゲームに戻る",
            BTN_LOBBY: "ロビーに戻る"
        },
        ZH: { // CHINESE
            MENU_SETTINGS: "设置",
            SELECT_LANG: "选择语言",
            BTN_ACCOUNT: "账户",
            MODE_MULTIPLAYER: "多人游戏",
            MODE_PRIVATE: "私人房间",
            MODE_BOT: "人机对战",
            TITLE_ELIMINATED: "已被淘汰",
            STAT_SCORE: "最终得分",
            BTN_RETURN: "返回游戏",
            BTN_LOBBY: "前往大厅"
        },
        KO: { // KOREAN
            MENU_SETTINGS: "설정",
            SELECT_LANG: "언어 선택",
            BTN_ACCOUNT: "계정",
            MODE_MULTIPLAYER: "멀티플레이어",
            MODE_PRIVATE: "프라이빗 룸",
            MODE_BOT: "봇 매치",
            TITLE_ELIMINATED: "탈락했습니다",
            STAT_SCORE: "최종 점수",
            BTN_RETURN: "게임으로 돌아가기",
            BTN_LOBBY: "로비로 이동"
        },
        HI: { // HINDI
            MENU_SETTINGS: "सेटिंग्स",
            SELECT_LANG: "भाषा चुनें",
            BTN_ACCOUNT: "खाता",
            MODE_MULTIPLAYER: "मल्टीप्लेयर",
            MODE_PRIVATE: "प्राइवेट रूम",
            MODE_BOT: "बॉट मैच",
            TITLE_ELIMINATED: "बाहर हो गए",
            STAT_SCORE: "अंतिम स्कोर",
            BTN_RETURN: "गेम में वापस जाएं",
            BTN_LOBBY: "लॉबी में जाएं"
        }
    },
    
    EXECUTE_TRANSLATION: function() {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (this.DICTIONARY[this.CURRENT_LANG][key]) {
                // If it's an action button text span wrapper
                const innerSpan = element.querySelector('.btn-text');
                if (innerSpan) {
                    innerSpan.innerText = this.DICTIONARY[this.CURRENT_LANG][key];
                } else {
                    element.childNodes[0].textContent = this.DICTIONARY[this.CURRENT_LANG][key] + " ";
                }
            }
        });
    },

    SWITCH_LANGUAGE: function(langCode) {
        if (this.DICTIONARY[langCode]) {
            this.CURRENT_LANG = langCode;
            this.EXECUTE_TRANSLATION();
            
            // Handle Right-to-Left formatting for Hebrew and Arabic
            if (langCode === 'HE' || langCode === 'AR') {
                document.documentElement.setAttribute('dir', 'rtl');
            } else {
                document.documentElement.setAttribute('dir', 'ltr');
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => I18N_ENGINE.EXECUTE_TRANSLATION());
