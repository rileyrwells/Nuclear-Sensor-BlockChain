// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NuclearSensors{
    int public constant SCALING_FACTOR = 100000000;
    //Constant Values for normal metric ranges

    int public constant RADIATION_VALUE = 11 * SCALING_FACTOR/10000; // Divide by 10000

    int public constant TEMPERATURE_MIN = 298 * SCALING_FACTOR;
    int public constant TEMPERATURE_MAX = 311 * SCALING_FACTOR;

    int public constant STEAM_A_PRESSURE_MIN = 67 * SCALING_FACTOR; 
    int public constant STEAM_A_PRESSURE_MAX = 79 * SCALING_FACTOR;

    int public constant STEAM_B_PRESSURE_MIN = 67 * SCALING_FACTOR;
    int public constant STEAM_B_PRESSURE_MAX = 79 * SCALING_FACTOR;

    int public constant LEVEL_PRESSURE_MIN = 32 * SCALING_FACTOR;
    int public constant LEVEL_PRESSURE_MAX = 63 * SCALING_FACTOR;

    int public constant TURBINE_LOAD_MIN = 40 * SCALING_FACTOR;
    int public constant TURBINE_LOAD_MAX = 100 * SCALING_FACTOR;

    int public constant RCS_PRESSURE_MIN = 148 * SCALING_FACTOR;
    int public constant RCS_PRESSURE_MAX = 158 * SCALING_FACTOR;

    int public constant TOTAL_LEAKAGE_MIN = 665 * SCALING_FACTOR/1000; //Divide by 1000
    int public constant TOTAL_LEAKAGE_MAX = 4015 * SCALING_FACTOR;

    enum vars {Rad, Temp, PA, PB, LP, PTL, RCSP, TL  }

    struct Sensor{
        int Time;
        int Radiation;
        int TemperatureAverage;
        int PressureA;
        int PressureB;
        int LevelPressure;
        int Power_Turbine_load;
        int RCS_Pressure;
        int Total_Leakage;

        uint256 timestamp;

        string In_Range_Status_Message;
    }

    Sensor[] public Sensor_Array;     
    mapping(int => Sensor) public Sensor_Array_Time_Map;

    event SensorRecordAdded(
        int Time,
        int Radiation,
        int TemperatureAverage,
        int PressureA,
        int PressureB,
        int LevelPressure,
        int Power_Turbine_load,
        int RCS_Pressure,
        int Total_Leakage
    );

    // event SensorOutOfRange(int Time_Input, string message);

    function set_range_check_message(int time) public{
        
        string memory status_message;
        
        status_message = check_if_in_range(
            Sensor_Array_Time_Map[time].Radiation, 
            Sensor_Array_Time_Map[time].TemperatureAverage, 
            Sensor_Array_Time_Map[time].PressureA, 
            Sensor_Array_Time_Map[time].PressureB, 
            Sensor_Array_Time_Map[time].LevelPressure, 
            Sensor_Array_Time_Map[time].Power_Turbine_load, 
            Sensor_Array_Time_Map[time].RCS_Pressure, 
            Sensor_Array_Time_Map[time].Total_Leakage
        );

        Sensor_Array_Time_Map[time].In_Range_Status_Message = status_message;
        
    }

    function add_sensor_data (
        int Time_Input,
        int Radiation_Input,
        int Temperature_Average_Input,
        int PressureA_Input,
        int PressureB_Input,
        int Level_Pressure_Input,
        int Power_Turbine_load_Input,
        int RCS_Pressure_Input,
        int Total_Leakage_Input
    ) public

        {
            Sensor memory new_sensor;

            new_sensor.Time = Time_Input;
            new_sensor.Radiation = Radiation_Input;
            new_sensor.TemperatureAverage = Temperature_Average_Input;
            new_sensor.PressureA = PressureA_Input;
            new_sensor.PressureB = PressureB_Input;
            new_sensor.LevelPressure = Level_Pressure_Input;
            new_sensor.Power_Turbine_load = Power_Turbine_load_Input;
            new_sensor.RCS_Pressure = RCS_Pressure_Input;
            new_sensor.Total_Leakage = Total_Leakage_Input;

            new_sensor.timestamp = block.timestamp;

            Sensor_Array.push(new_sensor);
            Sensor_Array_Time_Map[Time_Input] = new_sensor;

            emit SensorRecordAdded(
                Time_Input,
                Radiation_Input, 
                Temperature_Average_Input, 
                PressureA_Input, 
                PressureB_Input, 
                Level_Pressure_Input, 
                Power_Turbine_load_Input, 
                RCS_Pressure_Input,
                Total_Leakage_Input
            );


        }

    function check_if_in_range (
            
        int Radiation_Input,
        int Temperature_Average_Input,
        int PressureA_Input,
        int PressureB_Input,
        int Level_Pressure_Input,
        int Power_Turbine_load_Input,
        int RCS_Pressure_Input,
        int Total_Leakage_Input
        ) pure public returns(string memory){
            string memory error_message = "";
            if (Radiation_Input != RADIATION_VALUE){
                error_message = string.concat(error_message,"ERROR: Radiation value out of range\n" );
            }

            if(Temperature_Average_Input < TEMPERATURE_MIN || Temperature_Average_Input > TEMPERATURE_MAX){
                error_message = string.concat(error_message,"ERROR: Temperature Average out of range\n" );
            }

            if(PressureA_Input < STEAM_A_PRESSURE_MIN || STEAM_A_PRESSURE_MAX > STEAM_A_PRESSURE_MAX){
                error_message = string.concat(error_message,"ERROR: Pressure A out of range\n" );
            }

            if(PressureB_Input < STEAM_B_PRESSURE_MIN || PressureB_Input > STEAM_B_PRESSURE_MAX){
                error_message = string.concat(error_message,"ERROR: Pressure B out of range\n" );
            }

            if(Level_Pressure_Input < LEVEL_PRESSURE_MIN || Level_Pressure_Input > LEVEL_PRESSURE_MAX){
                error_message = string.concat(error_message,"ERROR: Level Pressure out of range\n" );
            }

            if(Power_Turbine_load_Input < TURBINE_LOAD_MIN || Power_Turbine_load_Input > TURBINE_LOAD_MAX){
                error_message = string.concat(error_message,"ERROR: Power Turbine Load out of range\n" );
            }

            if(RCS_Pressure_Input < RCS_PRESSURE_MIN || RCS_Pressure_Input > RCS_PRESSURE_MAX){
                error_message = string.concat(error_message,"ERROR: RCS Pressure out of range\n" );
            }

            if(Total_Leakage_Input < TOTAL_LEAKAGE_MIN || Total_Leakage_Input > TOTAL_LEAKAGE_MAX){
                error_message = string.concat(error_message,"ERROR: Toal Leakage out of range\n" );
            }

           else if(bytes(error_message).length == 0){
                error_message = "All values are in range!\n";
           }

           return error_message;
        }

    function get_data_by_index(uint256 index) public view returns (Sensor memory){
        return Sensor_Array[index];
    }    
    function get_data_by_time(int time) public view returns (Sensor memory){
        return Sensor_Array_Time_Map[time];    
    }    
}
