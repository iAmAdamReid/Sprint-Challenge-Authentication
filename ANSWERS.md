<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

We use sessions in order to manage a pseudo-state in HTML. Because HTML is a stateless language, we need to create sessions (and their associated credentials/tokens) in order to implement a state-like environment that can present HTTP based on conditional logic (e.g. user permissions, preference cookies, etc.)

2. What does bcrypt do to help us store passwords in a secure manner.

Passing passwords through bcrypt allows us to cryptographically hash the password.The password is passed through a cryptographic algorithm that returns a password hash with much greater complexity than plaintext. We can store these hashed passwords in a database, and they will be much more secure than storing passwords in plaintext. 


3. What does bcrypt do to slow down attackers?

By using a cryptographic hashing algorithm to hash passwords, we prevent the password from ever being stored in plaintext. This way, even if the hashed password is leaked (which has happened many times in major companies), the contents of the password will not be accessible without potentially thousands of millenia of computing power trying to decode the password from the hash.

4. What are the three parts of the JSON Web Token?

To create a JWT, we need the payload (the information to be encoded, e.g. username and password), we need a secret key to encrypt the token and ensure the token has not been tampered with, and we need options such as expiration to tell us how long this token will be usable.

Once the token is generated, it will have 3 parts:
1.The header: tells us the token type and the algorithm used
2.The payload: the information encoded within the token
3.The signature: contains the encrypted secret key to ensure token is valid when using `compareSync`