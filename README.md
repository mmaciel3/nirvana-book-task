Sample API call

```
curl --location --request POST 'http://localhost:3000/create-project' \
--header 'Content-Type: application/json' \
--header 'Accept-Language: en_US' \
--data-raw '{
	"userName": "my user",
        "password":  "my password",
        "bookTitle": "A Clockwork Orange",
        "bookDescription": "https://www.amazon.com/Clockwork-Orange-Anthony-Burgess-ebook/dp/B005HSGB6W/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=&sr=",
        "percentagePerDay": "8",
        "startDate": "20200419"
}'
```