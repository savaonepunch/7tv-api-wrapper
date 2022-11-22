const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config()

const PORT = process.env.PORT || 8000;

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}


const app = express();

app.use(cors(corsOptions))
app.use(express.json());

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`))


app.get('/', (req, res) => {
    res.json({ message: "Works!" });
});


app.get('/v2/emotes/global', async (req, res) => {
        const axiosRes = await axios.get("https://api.7tv.app/v2/emotes/global");
        const emotesArray = axiosRes.data;
        const data = {
            emotes: emotesArray
        }
        res.send(data);
});

app.get('/v2/users/:id/emotes', async (req, res) => {
    try {
        const axiosRes = await axios.get(`https://api.7tv.app/v2/users/${req.params.id}/emotes`);  
        const emotesArray = axiosRes.data;
        const data = {
            emotes: emotesArray
        }
        res.send(data);
    } catch (error) {
        res.send(error);
        
    }
   
});