const { FindAllUser } = require("../repository/UserRepository");
jest.mock("../repository/UserRepository.js");

// con esto puedo hacer una prueba de lista
const returnUsers = [
  {
    "_id": "6540066e860aa53826cc38f0",
    "nombres": "Brayan Barajas",
    "email": "brayan@gmail.ocm",
    "usuario": "Stiven",
    "foto": "https://scontent.feoh2-1.fna.fbcdn.net/v/t39.30808-6/291483204_3349948505242815_4855637759483753400_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF4jhSzqjh14p_Yt81K5SklsoyuYiMbQ-OyjK5iIxtD4z2khxIH6f357jzb6cGuLvVK097DJUtDrLhFqmjYY-x2&_nc_ohc=8K3jdCjVS9QAX9Sr7hZ&_nc_ht=scontent.feoh2-1.fna&oh=00_AfDsqKGsfYua7uJ0OKdNWiNA_Zh9avMC6Us1AIqezYl5tQ&oe=6545A225",
    "password": "$2a$10$gHMECpzjNCaFd5IihsxKOuhTCljEZH/awNdLFXfMGEMtTUmZY6rAu",
    "__v": 0
  },
  {
    "_id": "654006bc7aa7a8100d666957",
    "nombres": "camilo sanchez",
    "email": "camilo.sanchezb@unac.edu.co",
    "usuario": "kmiloblanco",
    "foto": "https://media-bog1-1.cdn.whatsapp.net/v/t61.24694-24/375874911_839381007507264_5933585992185526030_n.jpg?ccb=11-4&oh=01_AdTNLZLH-CTU-eYbpwx17LZd_9ks6PuW9GJMof7DB029Ng&oe=654D03DB&_nc_sid=000000&_nc_cat=103",
    "password": "$2a$10$yysQ7dY8RFjxXg5WUar0fe5JRgq7/CIpy8clxb3AifgZOaDt4lWpy",
    "__v": 0
  },
  {
    "_id": "65419a09da2a739ccd43df17",
    "nombres": "a",
    "email": "a@gmail.com",
    "usuario": "a",
    "foto": "data:image/jpeg;base64,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",
    "password": "$2a$10$JwVFZ3l5uskY6KqJk0jas.GnjYP8Hf2m/XlaNj9RFOLSbDlMUAZNS",
    "__v": 0
  }
];

describe("Test Users repository", () => {
  it("should data Users", () => {
    FindAllUser.mockReturnValueOnce(returnUsers);
    const response = FindAllUser();
    expect(response).toBe(returnUsers);
  });

});
