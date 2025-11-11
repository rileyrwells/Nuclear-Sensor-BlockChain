const fs = require('fs');
const { ethers } = require('ethers');

// --- CONFIGURATION ---
const CONFIG = {
    // Replace with the RPC URL of the network where your contract is deployed 
    rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com', 
    //  Your wallet's private key for signing transactions
    privateKey: 'privatekey', 
    // replace with the deployed address of your contract
    contractAddress: 'contractAddress', 
    // Replace with the Contracts ABI
    contractABI: [ /* ABI*/ ], 
    // Replace with the name of your csv file
    inputFile: 'NuclearUpdated.csv' 
};

function readSensorData(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const lines = data.trim().split('\n');
        const dataLines = lines.slice(1); 

        const SCALING_FACTOR = 10000; 
        
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
                Radiation: Math.round(parseFloat(parts[7].trim()) * 100000),   
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
                
                const tx = await contract.add_sensor_data(
                    sensor.Time, 
                    sensor.Radiation,        
                    sensor.TemperatureAverage, 
                    sensor.PressureA, 
                    sensor.PressureB, 
                    sensor.LevelPressure, 
                    sensor.Power_Turbine_load, 
                    sensor.RCS_Pressure,      
                    sensor.Total_Leakage 
                );
                
                console.log(`Transaction sent: ${tx.hash}`);
                
                const receipt = await tx.wait(); 
                const txEndTime = Date.now();
                const duration = (txEndTime - txStartTime) / 1000;
                
                const gasUsed = receipt.gasUsed;
                const gasPrice = receipt.gasPrice || tx.gasPrice;
                const txCost = gasUsed * gasPrice;
                
                console.log(`Confirmed in block ${receipt.blockNumber}`);
                console.log(`Time taken: ${duration.toFixed(2)} seconds`);
                console.log(`Gas used: ${gasUsed.toString()}`);
                console.log(`Cost: ${ethers.formatEther(txCost)} ETH\n`);
                
                results.push({
                    Time: sensor.Time,
                    TemperatureAverage: sensor.TemperatureAverage,
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
        
        fs.writeFileSync('sensor_results_new.json', JSON.stringify(results, null, 2));
        console.log('Results saved to sensor_results_new.json');
        
    } catch (error) {
        console.error(`\nFatal error during setup or execution: ${error.message}`);
        process.exit(1);
    }
}

processTransactions();
