# Formula1 API
![f1](https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-7.png)  


The scraper scrapes this website: https://www.formula1.com

# Installation
```bash
npm i f1-api-node
```
# Example snippet
  
The following function will print the current lineup of F1 drivers.

```javascript
const f1Api = require('f1-api-node') 

const myFunction = async () => {
    const driverLineup = await f1Api.getDriverData()
    console.log(driverLineup)
}

myFunction()
```

# Functions

### **1. getConstructorStandings**  
  
| Description | Needs Paramter ? | Paramter Description | Default Argument |
|:------------|------------------|----------------------|------------------|
| Fetch Constructors standings from points table | Yes - 1 | The year from which you want to extract points table for (1950 - current) | current year |

 
### **2. getDriverStandings**   

| Description | Needs Paramter ? | Paramter Description | Default Argument |
|:------------|------------------|----------------------|------------------|
| Fetch F1 driver standings from points table | Yes - 1 |  The year from which you want to extract points table for (1950 - current) | current year |


### **3. getDriverLineup**  

| Description | Needs Paramter ? | Paramter Description | Default Argument |
|:------------|------------------|----------------------|------------------|
| Fetch the current lineup of F1 drivers | No |  - | - |
   

### **4. getTeamLineup**  
| Description | Needs Paramter ? | Paramter Description | Default Argument |
|:------------|------------------|----------------------|------------------|
| Fetch the current list of F1 teams | No |  - | - |

  
### **5. getWorldChampions**  
| Description | Needs Paramter ? | Paramter Description | Default Argument |
|:------------|------------------|----------------------|------------------|
|   Fetch all the world champions   | No |  - | - |


### **6. getRaceResults**  
| Description | Needs Paramter ? | Paramter Description | Default Argument |
|:------------|------------------|----------------------|------------------|
|   Fetch race results of all the grand prix in a given year   | Yes - 1  | The year from which you want to extract race results (1950 - current) | - |


# Snapshots

If you want to have a look at the output from the given functions check [this](https://github.com/yashkathe/F1-API/tree/master/__tests__/__snapshots__).



# Usage
WARNING: Abusing this library may result in an IP ban from the host website.  
Please use with caution and try to limit the rate and amount of your requests if you value your access to formula1.com

# Report Problems

If you have any problems regarding this project, read the following [disclaimer](https://github.com/yashkathe/F1-API/blob/master/DISCLAIMER.md).  