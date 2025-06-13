const express = require('express');
const Airtable = require('airtable');
const app = express();
const port = 3000;

// Конфигурация Airtable с твоим API Token
Airtable.configure({
    apiKey: 'patnSPvY4nXWwLNZs.9b994e8e3c6e931895c9d1e19a1c921d5d034e8164afb8e6b5837930ff8ba53f',
});

// Указываем твой Base ID
const base = Airtable.base('appGPtJeeWeguZwSu');

// Обработчик запроса проверки доступа
app.get('/api/check-access', async (req, res) => {
    const userId = req.query.userid;
    try {
        const records = await base('Users').select({
            filterByFormula: `{UserId} = '${userId}'`
        }).firstPage();

        if (records.length > 0 && records[0].fields.HasAccess) {
            res.json({ access: true });
        } else {
            res.json({ access: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ access: false });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
