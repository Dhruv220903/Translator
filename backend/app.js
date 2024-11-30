const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());


const AZURE_KEY = "65h2TyzTehCCgnFXeOhE2N5FMAy6y062OSLsme9BteoTvBm0p9DqJQQJ99AKACYeBjFXJ3w3AAAEACOGTenG";
const AZURE_ENDPOINT = "https://multiser777777777.cognitiveservices.azure.com/";
const AZURE_REGION = "eastus";


const textAnalyticsClient = new TextAnalyticsClient(AZURE_ENDPOINT, new AzureKeyCredential(AZURE_KEY));

app.get('/',(req,res)=>{
    res.send('hello');
})
app.post("/analyze", async (req, res) => {
    const { text, targetLanguage } = req.body;

    try {
        
        const translatorUrl = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLanguage}`;
        const translatorResponse = await axios.post(
            translatorUrl,
            [{ Text: text }],
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": AZURE_KEY,
                    "Ocp-Apim-Subscription-Region": AZURE_REGION,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(translatorResponse);
        const translatedText = translatorResponse.data[0].translations[0].text;

    
        const sentimentResult = await textAnalyticsClient.analyzeSentiment([text]);
        const sentiment = sentimentResult[0].sentiment;

        
        res.json({
            translatedText,
            sentiment,
        });
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
