const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("http-status-codes").StatusCodes
const request = require("supertest");
const app = require("../../../app");
const fs = require("fs-extra");
const { FILE_DIR } = require("../../../config");

describe("Test Converter", () => {
    
    afterEach(()=>{
        jest.clearAllMocks();
    });

    const fileFake = `${__dirname}/test-header.csv`;
    const fileNotAllowed = `${__dirname}/test.jpg`;
    describe("Schema test", ()=>{
        it("Should return BAD REQUEST if file is not passed", async () => {
            const res = await request(app)
                .post("/upload");
    
            expect(res.statusCode).toBe(BAD_REQUEST)
            expect(res.body.message).toContain("Should upload a file")
        });
    
        it("Should return BAD REQUEST if delimiter is not passed", async () => {
            const res = await request(app)
                .post("/upload")
                .attach("file", fileFake);
            
            expect(res.statusCode).toBe(BAD_REQUEST)
            expect(res.body.errors[0].message).toContain("delimiter")
        });
    
        it("Should return BAD REQUEST if header is not passed", async () => {
            const res = await request(app)
                .post("/upload")
                .attach("file", fileFake)
                .field("delimiter", ";");
            
            expect(res.statusCode).toBe(BAD_REQUEST)
            expect(res.body.errors[0].message).toContain("header")
        });
    
        it("Should return BAD REQUEST if header is not passed", async () => {
            const res = await request(app)
                .post("/upload")
                .attach("file", fileFake)
                .field("delimiter", ";");
            
            expect(res.statusCode).toBe(BAD_REQUEST)
            expect(res.body.errors[0].message).toContain("header")
        });

        it("Should return error if file is not allowed", async () => {
            const res = await request(app)
                .post("/upload")
                .attach("file", fileNotAllowed)
                .field("delimiter", ";")
                .field("header", false);
            
            expect(res.statusCode).toBe(INTERNAL_SERVER_ERROR)
            expect(res.body.message).toContain("File is not allowed")
        })

        it("Should return error if there is internal error", async () => {
            fs.removeSync(`../../${FILE_DIR}`, { recursive: true, force: true });
            const res = await request(app)
                .post("/upload")
                .attach("file", fileFake)
                .field("delimiter", ";")
                .field("header", false);
            fs.mkdirSync(`../../${FILE_DIR}`);
            expect(res.statusCode).toBe(INTERNAL_SERVER_ERROR)
            expect(res.body.message).toContain("no such file")
        })
    })

    describe("Convertion test", () => {
        const csvHeader = `${__dirname}/test-header.csv`;
        const csvNoHeader = `${__dirname}/test-noheader.csv`;

        const expected = [
            { col1: 'Diego', col2: 'Tapia', col3: 31, col4: false },
            { col1: 'Francisco', col2: 'Tapia', col3: 30, col4: '' },
            { col1: 'Alberto', col2: '', col3: 20.9, col4: '' }
        ];

        it("Should convert correctly file with headers", async () => {
            const res = await request(app)
                .post("/upload")
                .attach("file", csvHeader)
                .field("delimiter", ";")
                .field("header", true);

            expect(JSON.stringify(res.body)).toBe(JSON.stringify(expected));            

        });

        it("Should throw error if try to convert no header without columns in the body", async () => {
            const res = await request(app)
                .post("/upload")
                .attach("file", csvHeader)
                .field("delimiter", ";")
                .field("header", false);

            expect(res.statusCode).toBe(BAD_REQUEST);            
        });

        it("Should convert correctly file with no headers", async () => {
            const res = await request(app)
                .post("/upload")
                .attach("file", csvHeader)
                .field("delimiter", ";")
                .field("header", false)
                .field("columns", "col1;col2;col3;col4");

            expect(JSON.stringify(res.body)).toBe(JSON.stringify(expected));            
        });
    })
});