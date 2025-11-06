// api/lookup.js
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const number = req.query.number;
  const key = req.query.key;

  // apni API ke liye valid key
  const MY_KEYS = ["happy143", "demo_key"];
  if (!MY_KEYS.includes(key)) {
    return res.status(401).json({ status: "error", message: "Invalid API key" });
  }

  try {
    // original API ko call karte hain
    const originalKey = "vishalboss_key_e44bb10fcf8f9c61f5033111ba88882e1c471edb";
    const url = `https://numberimfo.vishalboss.sbs/api.php?number=${encodeURIComponent(
      number
    )}&key=${originalKey}`;

    const response = await fetch(url);
    const data = await response.json();

    // ab usi data me apni extra field add karte hain
    const finalData = {
      ...data,
      developer_note: "Devloped by happy"
    };

    res.status(200).json(finalData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch data from original API"
    });
  }
}
