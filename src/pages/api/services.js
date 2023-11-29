export default async (req, res) => {
  try {
    let id = "";
    if (req.query.type == "telecom") {
      id = "5046540E-0AFC-4D73-9699-69269643BF27";
    } else if (req.query.type == "moi") {
      id = "DD6E76F2-346A-4889-AC14-1176A673EF9C";
    }
    var buf = Buffer.from(req.query.external, "base64").toString("utf-8");
    console.log(buf);
    const response = await fetch(
      `${process.env.BASE_API_URL}/ClubServices/api/ServiceClub?Serviceid=${id}&ExternalUserId=${buf}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Set the request content type,
          "Ocp-Apim-Subscription-Key": "835e396d470544c7838d7f083698808b",
          ExternalUserId: buf,
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
