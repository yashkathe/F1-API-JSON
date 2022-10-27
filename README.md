# Formula1 API
![f1](https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-7.png)  


The scraper scrapes this website: https://www.formula1.com

## Installation
```bash
npm i f1-api-node
```
## Functions

- **getConstructorStandings**  
  
  Fetch Constructors standings from points table.  
  The function takes one argument: The year from which you want to extract points table for.  
  Default argument is the current year.  
 
- **getDriverStandings**   
  Fetch F1 driver standings from points table.    
  The function takes one argument: The year from which you want to extract points table for.      
  Default argument is the current year. 

- **getDriverData**  
  Fetch the current lineup of F1 drivers.  
  _No arguments_

- **getTeamsData**  
  Fetch the current list of F1 teams along with their information.  
  _No arguments_
  
- **getWorldChampions**  
  Fetch all the world champions  
  _No arguments_

## Snapshots

If you want to have a look at the output from the given functions check [this](https://github.com/yashkathe/F1-API/tree/master/__tests__/__snapshots__).

## Example snippet

Example on how to use one of the given functions.  
The following function will print the current lineup of F1 drivers.

```javascript
const f1Api = require('f1-api-node') 

const myFunction = async () => {
    const driverLineup = await f1Api.getDriverData()
    console.log(driverLineup)
}

myFunction()
```

## Usage
WARNING: Abusing this library may result in an IP ban from the host website.  
Please use with caution and try to limit the rate and amount of your requests if you value your access to formula1.com

## Report Problems

If you have any problems regarding this project, read the following [disclaimer](https://github.com/yashkathe/F1-API/blob/master/DISCLAIMER.md).  