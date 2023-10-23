import {faker} from '@faker-js/faker';

const userFixture = {
    user: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birthDay: `${faker.number.int({min: 1, max: 31})}`,
        birthMonth: `${faker.number.int({min: 1, max: 12})}`,
        birthYear: `${faker.number.int({min: 1913, max: 2005})}`,
        companyName: faker.company.name(),
        country: 'United States',
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        city: faker.location.city(),
        streetAddress: faker.location.streetAddress(),
        phone: faker.phone.number(),
        creditCardNumber: faker.finance.creditCardNumber(),
        creditCardCVV: faker.finance.creditCardCVV(),
        cardExpMonth: `${faker.number.int({min: 1, max: 12})}`,
        cardExpYear: `${faker.number.int({min: 2024, max: 2037})}`,
        cardType: 'Master card'
    },

    fakeUser: {
        fakePassword: faker.internet.password(),
        fakeEmail: faker.internet.email(),
    },

}
export default userFixture