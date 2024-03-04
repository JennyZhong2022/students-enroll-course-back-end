const bcrypt = require('bcrypt')

const password = '123'

const hashedPassword = bcrypt.hashSync(password, 12)

console.log(hashedPassword);

// ➜  cms git:(main) ✗ node bcrypt.js 
// $2b$12$lpz4URBmK6PnWMk2GuuxX.NVI6ZjRwHAIE6QLTl0cYhaqapAzF.h2
// ➜  cms git:(main) ✗ node bcrypt.js 
// $2b$12$vkuKFt721qV55jQZIESCXObknPB.Ko9C0o5yJf/KmJJ8VTeRQIEQy

console.log(bcrypt.compareSync('123',hashedPassword));  //true 