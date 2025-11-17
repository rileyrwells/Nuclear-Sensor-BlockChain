const fs = require('fs');
const { ethers } = require('ethers');

// --- CONFIGURATION ---
const CONFIG = {
    // Replace with the RPC URL of the network where your contract is deployed 
    rpcUrl: 'https://rpc-sepolia.rockx.com', 
    //  Your wallet's private key for signing transactions
    privateKey: '**PRIVATE KEY HERE**', 
    // replace with the deployed address of your contract
    contractAddress: '**CONTRACT ADDRESS HERE**', 
    // Replace with the Contracts ABI
    contractABI: [ 
	[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "int256",
				"name": "Time",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "Radiation",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "TemperatureAverage",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "PressureA",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "PressureB",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "LevelPressure",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "Power_Turbine_load",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "RCS_Pressure",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "Total_Leakage",
				"type": "int256"
			}
		],
		"name": "SensorRecordAdded",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "LEVEL_PRESSURE_MAX",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "LEVEL_PRESSURE_MIN",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "RADIATION_VALUE",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "RCS_PRESSURE_MAX",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "RCS_PRESSURE_MIN",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SCALING_FACTOR",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "STEAM_A_PRESSURE_MAX",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "STEAM_A_PRESSURE_MIN",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "STEAM_B_PRESSURE_MAX",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "STEAM_B_PRESSURE_MIN",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Sensor_Array",
		"outputs": [
			{
				"internalType": "int256",
				"name": "Time",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Radiation",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "TemperatureAverage",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "PressureA",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "PressureB",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "LevelPressure",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Power_Turbine_load",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "RCS_Pressure",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Total_Leakage",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "num_errors",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"name": "Sensor_Array_Time_Map",
		"outputs": [
			{
				"internalType": "int256",
				"name": "Time",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Radiation",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "TemperatureAverage",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "PressureA",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "PressureB",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "LevelPressure",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Power_Turbine_load",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "RCS_Pressure",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Total_Leakage",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "num_errors",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TEMPERATURE_MAX",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TEMPERATURE_MIN",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TOTAL_LEAKAGE_MAX",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TOTAL_LEAKAGE_MIN",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TURBINE_LOAD_MAX",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TURBINE_LOAD_MIN",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "Time_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Radiation_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Temperature_Average_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "PressureA_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "PressureB_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Level_Pressure_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Power_Turbine_load_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "RCS_Pressure_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Total_Leakage_Input",
				"type": "int256"
			}
		],
		"name": "add_sensor_data",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "Radiation_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Temperature_Average_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "PressureA_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "PressureB_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Level_Pressure_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Power_Turbine_load_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "RCS_Pressure_Input",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "Total_Leakage_Input",
				"type": "int256"
			}
		],
		"name": "check_if_in_range",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "get_data_by_index",
		"outputs": [
			{
				"components": [
					{
						"internalType": "int256",
						"name": "Time",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "Radiation",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "TemperatureAverage",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "PressureA",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "PressureB",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "LevelPressure",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "Power_Turbine_load",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "RCS_Pressure",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "Total_Leakage",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "In_Range_Status_Message",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "num_errors",
						"type": "uint256"
					}
				],
				"internalType": "struct NuclearSensors.Sensor",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "time",
				"type": "int256"
			}
		],
		"name": "get_data_by_time",
		"outputs": [
			{
				"components": [
					{
						"internalType": "int256",
						"name": "Time",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "Radiation",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "TemperatureAverage",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "PressureA",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "PressureB",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "LevelPressure",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "Power_Turbine_load",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "RCS_Pressure",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "Total_Leakage",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "In_Range_Status_Message",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "num_errors",
						"type": "uint256"
					}
				],
				"internalType": "struct NuclearSensors.Sensor",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "time",
				"type": "int256"
			}
		],
		"name": "set_range_check_message",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
], 
    // Replace with the name of your csv file
    inputFile: 'NuclearUpdated.csv' 
};

const bigIntReplacer = (key, value) => {
    // Check if the value is a BigInt type
    if (typeof value === 'bigint') {
        // Convert BigInt to its string representation
        return value.toString();
    }
    return value;
};

function readSensorData(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const lines = data.trim().split('\n');
        const dataLines = lines.slice(1); 

        const SCALING_FACTOR = 100000000; 
        
        const sensorRecords = dataLines.map(line => {
            const parts = line.split(',');
            
            if (parts.length < 9) {
                console.error(`Skipping invalid row: Expected 9 columns, found ${parts.length}.`);
                return null;
            }
            
            return {
                
                Time: parseInt(parts[0].trim()),                                
                RCS_Pressure: Math.round(parseFloat(parts[1].trim()) * SCALING_FACTOR),  
                TemperatureAverage: Math.round(parseFloat(parts[2].trim()) * SCALING_FACTOR), 
                PressureA: Math.round(parseFloat(parts[3].trim()) * SCALING_FACTOR),      
                PressureB: Math.round(parseFloat(parts[4].trim()) * SCALING_FACTOR),     
                LevelPressure: Math.round(parseFloat(parts[5].trim()) * SCALING_FACTOR), 
                Power_Turbine_load: Math.round(parseFloat(parts[6].trim()) * SCALING_FACTOR), 
                Radiation: Math.round(parseFloat(parts[7].trim()) * SCALING_FACTOR),   
                Total_Leakage: Math.round(parseFloat(parts[8].trim()) * SCALING_FACTOR)  
            };
        }).filter(record => record !== null); 
        
        console.log(`Loaded ${sensorRecords.length} valid sensor records from ${filename}`);
        return sensorRecords;
    } catch (error) {
        console.error(`Fatal Error reading file: ${error.message}`);
        process.exit(1);
    }
}


async function processTransactions() {
    console.log('\nStarting Automated Sensor Data Processing...\n');
    
    try {
        console.log('Connecting to blockchain...');
        const provider = new ethers.JsonRpcProvider(CONFIG.rpcUrl, undefined, {
            staticNetwork: true,
            timeout: 60000
        });
        
        await provider.getNetwork();
        console.log('Connected to network.');
        
        const wallet = new ethers.Wallet(CONFIG.privateKey, provider);
        console.log(`Wallet connected: ${wallet.address}`);
        
        const balance = await provider.getBalance(wallet.address);
        console.log(`Wallet balance: ${ethers.formatEther(balance)} ETH\n`);
        
        if (balance === 0n) {
            console.error('Error: Wallet has no ETH for gas fees!');
            return;
        }
        
        const contract = new ethers.Contract(CONFIG.contractAddress, CONFIG.contractABI[0], wallet); 
        console.log(`Contract connected: ${CONFIG.contractAddress}\n`);
        
        const sensorRecords = readSensorData(CONFIG.inputFile);
        
        console.log('Processing sensor records...\n');
        const startTime = Date.now();
        const results = [];
        
        for (let i = 0; i < sensorRecords.length; i++) {
            const sensor = sensorRecords[i];
            const txStartTime = Date.now();
            
            try {
                console.log(`[${i + 1}/${sensorRecords.length}] Adding Time: ${sensor.Time}`);
                console.log(`  RCS Pressure: ${sensor.RCS_Pressure} | Avg Temp: ${sensor.TemperatureAverage} | Rad: ${sensor.Radiation}`);
                
                // const tx = await contract.add_sensor_data(
                //     sensor.Time, 
                //     sensor.Radiation,        
                //     sensor.TemperatureAverage, 
                //     sensor.PressureA, 
                //     sensor.PressureB, 
                //     sensor.LevelPressure, 
                //     sensor.Power_Turbine_load, 
                //     sensor.RCS_Pressure,      
                //     sensor.Total_Leakage 
                // );

                const tx = await contract.set_range_check_message(
                    sensor.Time,  
                );

                

                
                console.log(`Transaction sent: ${tx.hash}`);
                
                const receipt = await tx.wait(); 
                const txEndTime = Date.now();
                const duration = (txEndTime - txStartTime) / 1000;
                
                const gasUsed = receipt.gasUsed;
                const gasPrice = receipt.gasPrice || tx.gasPrice;
                const txCost = gasUsed * gasPrice;

                //new addition
                const updated_Sensor_Struct = await contract.get_data_by_time(sensor.Time);
                const number_errors = updated_Sensor_Struct.num_errors;
                
                console.log(`Number of errors: ${number_errors}`);

                console.log(`Confirmed in block ${receipt.blockNumber}`);
                console.log(`Time taken: ${duration.toFixed(2)} seconds`);
                console.log(`Gas used: ${gasUsed.toString()}`);
                console.log(`Cost: ${ethers.formatEther(txCost)} ETH\n`);
                
                results.push({
                    Time: sensor.Time,
                    // TemperatureAverage: sensor.TemperatureAverage,
                    // PressureA: sensor.PressureA, 
                    // PressureB: sensor.PressureB, 
                    // LevelPressure: sensor.LevelPressure, 
                    // PowerTurbineLoad: sensor.Power_Turbine_load, 
                    // RCS_Pressure: sensor.RCS_Pressure,
                    // Radiation: sensor.Radiation,
                    // TotalLeakage: sensor.Total_Leakage, 
                    
                    NumErrors: number_errors,
                    
                    txHash: tx.hash,
                    blockNumber: receipt.blockNumber.toString(), 
                    gasUsed: gasUsed.toString(),                 
                    costInEth: ethers.formatEther(txCost),     
                    duration: duration
                });
                
            } catch (error) {
                console.error(`Transaction Error for Time ${sensor.Time}: ${error.message}\n`);
                results.push({
                    Time: sensor.Time,
                    error: error.message
                });
            }
        }
        
        const endTime = Date.now();
        const totalDuration = (endTime - startTime) / 1000;
        
        console.log('\u2550'.repeat(50));
        console.log('SENSOR DATA IMPORT SUMMARY');
        console.log('\u2550'.repeat(50));
        
        const totalGas = results.filter(r => r.gasUsed).reduce((sum, r) => sum + BigInt(r.gasUsed), 0n);
        const totalCost = results.filter(r => r.costInEth).reduce((sum, r) => sum + parseFloat(r.costInEth), 0);
        
        console.log(`Total records read from CSV: ${sensorRecords.length}`);
        console.log(`Successfully recorded: ${results.filter(r => r.txHash).length}`);
        console.log(`Failed/Reverted: ${results.filter(r => r.error).length}`);
        console.log(`Total time elapsed: ${totalDuration.toFixed(2)} seconds`);
        console.log(`Total gas used: ${totalGas.toString()}`);
        console.log(`TOTAL COST: ${totalCost.toFixed(6)} ETH`);
        console.log('\u2550'.repeat(50) + '\n');
        
        fs.writeFileSync('new_error.json', JSON.stringify(results, bigIntReplacer, 2));
        console.log('Results saved to new_error_test.json');
        
    } catch (error) {
        console.error(`\nFatal error during setup or execution: ${error.message}`);
        process.exit(1);
    }
}

processTransactions();
