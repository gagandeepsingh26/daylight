/// <reference types="cypress" />

describe("API Testing for eventbrite", function () {

    let token = process.env.EVENTBRITE_TOKEN;
    let organization_id = process.env.ORGANIATION_ID
    let event_id;
    
    it("CREATE an event from scratch", () => {
        cy.request({
            method: "POST",
            url: 'https://www.eventbriteapi.com/v3/organizations/'+ organization_id +'/events/',
            headers: {
                "Authorization": 'Bearer ' + token,
            },
            body: {
                event: {
                    name: {
                        html: "My New Event"
                    },
                    start:{
                        timezone: "UTC",
                        utc: "2022-12-01T02:00:00Z"
                    },
                    end:{
                        timezone: "UTC",
                        utc: "2022-12-01T05:00:00Z"
                    },
                    currency: "USD",
                    capacity: 50
                }
            }
            
        })
            .then(response => {
                cy.log(JSON.stringify(response))

                expect(response.status).to.equal(200)
                expect(response.body.name.html).includes('My New Event')
                expect(response.body.start.timezone).includes('UTC')
                expect(response.body.start.utc).includes('2022-12-01T02:00:00Z')
                expect(response.body.end.timezone).includes('UTC')
                expect(response.body.end.utc).includes('2022-12-01T05:00:00Z')
                expect(response.body.currency).includes('USD')
                expect(response.body.capacity).to.equal(50)
                event_id =  response.body.id
            })
    })


    it("UPDATE above event", () => {
        cy.request({
            method: "POST",
            url: 'https://www.eventbriteapi.com/v3/events/'+ event_id+'/',
            headers: {
                "Authorization": 'Bearer ' + token,
            },
            body: {
                event: {
                    description: {
                        html: "New Description"
                      },
                    start:{
                        timezone: "UTC",
                        utc: "2022-10-01T02:00:00Z"
                    },
                    end:{
                        timezone: "UTC",
                        utc: "2022-10-01T05:00:00Z"
                    },
                    currency: "CAD",
                    capacity: 200
                }
            }
        })
            .then(response => {
                cy.log(JSON.stringify(response))

                expect(response.status).to.equal(200)
                expect(response.body.description.html).includes('New Description')
                expect(response.body.start.utc).includes('2022-10-01T02:00:00Z')
                expect(response.body.end.utc).includes('2022-10-01T05:00:00Z')
                expect(response.body.currency).includes('CAD')
                expect(response.body.capacity).to.equals(200)
            })
    })
})
