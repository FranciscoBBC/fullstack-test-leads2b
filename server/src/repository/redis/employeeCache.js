const redisClient = require("./config")
const employeeRepository = require("../employeeRepository")
const prefix = "employee"

const employeeCache = {
    async find (companyID) {
        try {
            const employees = await employeeRepository.find(companyID)
            return employees
        } catch (e) {
          throw e;
        }
    },

    async findOne (companyID, employeeID) {
        try {
            const cachedEmployee = await redisClient.get(`${prefix}:${companyID}:${employeeID}`)
            if(cachedEmployee){
                return JSON.parse(cachedEmployee)
            }
            
            const employee = await employeeRepository.findOne(companyID, employeeID)
            if(employee){
                await redisClient.set(`${prefix}:${companyID}:${employeeID}`, JSON.stringify(employee))
            }

            return employee
        } catch (e) {
            console.log(e)
            throw e;
        }
      },

      async update (companyID, employeeID, employeeData) {
        try {
          const employee = await employeeRepository.update(companyID, employeeID, employeeData);

          await redisClient.del(`${prefix}:${companyID}:${employeeID}`)
          await redisClient.set(`${prefix}:${companyID}:${employeeID}`, JSON.stringify(employee))
    
          return employee;
        } catch (e) {
            throw e;
        }
      },
    
      async create (companyID, employeeData) {
        try {
          const employee = await employeeRepository.create(companyID, employeeData);
          await redisClient.del(`${prefix}:${companyID}:${employeeID}`)
          await redisClient.set(`${prefix}:${companyID}:${employeeID}`, JSON.stringify(employee))
    
          return employee;
        } catch (e) {
            throw e;
        }
      },
    
      async destroy(companyID, employeeID) {
        try {
           employeeRepository.destroy(companyID, employeeID)
           await redisClient.del(`${prefix}:${companyID}:${employeeID}`)
        } catch(e) {
            throw e;
        }
      },  
}

module.exports = employeeCache