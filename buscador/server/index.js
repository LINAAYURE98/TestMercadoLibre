import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());


const PORT = process.env.PORT || 3001;


// Firma requerida por el enunciado
const AUTHOR = { name: 'Lina', lastname: 'Ayure' };  

// Helpers
const splitPrice = (value) => {
    const [intPart, decPart = '0'] = value.toString().split('.');
    return {
    amount: Number(intPart),
    decimals: Number(decPart.padEnd(2, '0').slice(0, 2))
    };
};

const getCategoryPath = async (categoryId) => {
    if (!categoryId) return [];
    try {
    const { data } = await axios.get(`https://api.mercadolibre.com/categories/${categoryId}`);
    return data?.path_from_root?.map((c) => c.name) || [];
    } catch {
    return [];
    }
};

// GET /api/items?q=:query
app.get('/api/items', async (req, res) => {
    try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json({ author: AUTHOR, categories: [], items: [] });


    const { data } = await axios.get(`https://api.mercadolibre.com/sites/MLA/search`, { 
        params: { q } ,
        headers: { "Accept": "application/json" }
    });


    // Top categoría por cantidad de resultados
    const catFilter = (data.available_filters || []).find((f) => f.id === 'category');
    const topCategory = catFilter?.values?.slice().sort((a, b) => b.results - a.results)[0];
    const categories = await getCategoryPath(topCategory?.id);


    const items = (data.results || []).slice(0, 4).map((it) => {
        const price = splitPrice(it.price);
        return {
            id: it.id,
            title: it.title,
            price: {
                currency: it.currency_id,
                amount: price.amount,
                decimals: price.decimals,
            },
            picture: it.thumbnail,
            condition: it.condition,
            free_shipping: it.shipping?.free_shipping === true,
            address: it.address?.state_name || '', // opcional, útil para UI
        };
    });

    res.json({ author: AUTHOR, categories, items });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error fetching items' });
    }
});


// GET /api/items/:id
app.get('/api/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [itemRes, descRes] = await Promise.all([
        axios.get(`https://api.mercadolibre.com/items/${id}`),
        axios.get(`https://api.mercadolibre.com/items/${id}/description`).catch(() => ({ data: {} })),
    ]);

    const itemData = itemRes.data;
    const descData = descRes.data || {};
    const price = splitPrice(itemData.price);
    const picture = itemData.pictures?.[0]?.secure_url || itemData.thumbnail || '';


    const item = {
        id: itemData.id,
        title: itemData.title,
        price: {
            currency: itemData.currency_id,
            amount: price.amount,
            decimals: price.decimals,
        },
        picture,
        condition: itemData.condition,
        free_shipping: itemData.shipping?.free_shipping === true,
        sold_quantity: itemData.sold_quantity ?? 0,
        description: descData.plain_text || descData.text || '',
    };

    res.json({ author: AUTHOR, item });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error fetching item detail' });
    }
});
    
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
