const locations = {
    лес: {
        description: 'Вы находитесь в темном лесу. Перед вами враг.',
        items: ['медицинская_аптечка', 'ржавый меч', 'погнутый шлем'],
        enemy: {
            name: 'Бандит',
            health: 125,
            dialogues: [
                "Отдай все, что у тебя есть!",
                "Ты не пройдешь!",
                "Я уничтожу тебя!",
                "Ты никогда не победишь меня!"
            ]
        },
        spawnChance: 0.5,
        enemyCount: 3
    },
    деревня: {
        description: 'Вы прибыли в тихую деревню. Здесь можно отдохнуть и пополнить запасы.',
        items: ['яблоко', 'зелье'],
        enemy: null,
        residents: [
            { name: 'Житель1', quests: [{ description: 'Принесите мне яблоко из леса.', reward: 'зелье здоровья', completed: false }], dialogues: ["Приветствую вас, путник!", "Спасибо за помощь!"] },
            { name: 'Житель2', quests: [], dialogues: ["Добро пожаловать в нашу деревню!"] }
        ]
    },
    крепость: {
        description: 'Вы находитесь в своей крепости, планируя свое следующее злодейство.',
        items: ['меч', 'щит'],
        enemy: null,
        residents: [
            { name: 'Приспешник1', quests: [{ description: 'Возьмите яблоко из деревни.', reward: 'меч', completed: false }], dialogues: ["Что прикажете, хозяин?", "Я выполню ваше задание!"] },
            { name: 'Приспешник2', quests: [], dialogues: ["Я готов к вашим приказам!"] }
        ]
    },
    пещера: {
        description: 'Вы входите в темную пещеру. Здесь может быть что-то ценное.',
        items: ['золотой ключ', 'древний свиток'],
        enemy: {
            name: 'Дракон',
            health: 1000,
            dialogues: [
                "Ты осмелился войти в мою пещеру?",
                "Я сожгу тебя дотла!",
                "Ты пожалеешь, что пришел сюда!"
            ]
        }
    },
    замок: {
        description: 'Вы находитесь в старом замке. Здесь обитает могущественный маг.',
        items: ['волшебная палочка', 'книга заклинаний'],
        enemy: {
            name: 'Маг',
            health: 200,
            dialogues: [
                "Ты не пройдешь!",
                "Я уничтожу тебя!",
                "Ты никогда не победишь меня!"
            ]
        }
    },
    болото: {
        description: 'Вы находитесь в зловонном болоте. Здесь обитает опасный монстр.',
        items: ['ядовитое зелье', 'болотный цветок'],
        enemy: {
            name: 'Монстр',
            health: 150,
            dialogues: [
                "Ты не пройдешь!",
                "Я уничтожу тебя!",
                "Ты никогда не победишь меня!"
            ]
        }
    }
};