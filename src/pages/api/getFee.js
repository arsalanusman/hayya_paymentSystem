export default async (req, res) => {
  try {
    console.log(req.body)
    var buf = Buffer.from(req.body.external, 'base64').toString('utf-8')
    const response = await fetch(`${process.env.BASE_API_URL}/ClubServices/api/GetVisaFee?quoteNo=${req.body.quoteNo}&externalUserId=${buf}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the request content type,
        'Ocp-Apim-Subscription-Key':'835e396d470544c7838d7f083698808b'
      }
    });
    const data = await response.json();
    res.status(200).json({
      "id": "e92c0078-34da-4ca1-a1c5-a5b579e90955",
      "clientId": "34afbcdc-4c8d-4851-b5d8-b15a91ebd443",
      "subServiceId": "e619cd89-25e9-4629-be02-9d9c2bd2e2ff",
      "name": "MOI",
      "clientName": "MOI",
      "subService": "Visa",
      "logo": "https://res.cloudinary.com/draejjddq/image/upload/v1697547194/MOI_pexr9e.jpg",
      "price": 40.00,
      "createdOn": "0001-01-01T00:00:00",
      "createdBy": "00000000-0000-0000-0000-000000000000",
      "modifiedOn": "0001-01-01T00:00:00",
      "modifiedBy": "00000000-0000-0000-0000-000000000000",
      "isActive": true,
      "isDeleted": false,
      "quoteNo": ""
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};