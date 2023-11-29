export default async (req, res) => {
  try {
    var buf = Buffer.from(req.body.external, "base64").toString("utf-8");

    let url = `${process.env.BASE_API_URL}/ClubServices/api/ServiceClub/GetVisaFee?quoteNo=${req.body.quoteNo}&externalUserId=${buf}`;
    console.log(url, "buf");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the request content type,
        "Ocp-Apim-Subscription-Key": "835e396d470544c7838d7f083698808b",
        ExternalUserId: buf,
      },
    });
    const data = await response.json();
    console.log(data, "data");
    res.status(200).json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
