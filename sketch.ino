// INITALIZE ----------------------------------------------

#include <WiFi.h>
#include <HTTPClient.h>

#include "DHTesp.h"

#include "model.h"
Eloquent::ML::Port::DecisionTree classifier;

const int minRotation_PIN = 13;
const int sys1Inverter3CabinetTemp_PIN = 12;
const int sys1Inverter6CabinetTemp_PIN = 14;
const int sys2Inverter3CabinetTemp_PIN = 27;
const int sys2Inverter4CabinetTemp_PIN = 26; 
const int sys2Inverter7CabinetTemp_PIN = 15;
const int pitchCabinetBladeBTemp_PIN = 23;
const int nacelleAmbientTemp1_PIN = 22;
const int yawInverterCabinetTemp_PIN = 21;
const int controlCabinetTemp_PIN = 18;

DHTesp minRotationSensor;
DHTesp sys1Inverter3CabinetTempSensor;
DHTesp sys1Inverter6CabinetTempSensor;
DHTesp sys2Inverter3CabinetTempSensor;
DHTesp sys2Inverter4CabinetTempSensor;
DHTesp sys2Inverter7CabinetTempSensor;
DHTesp pitchCabinetBladeBTempSensor;
DHTesp nacelleAmbientTemp1Sensor;
DHTesp yawInverterCabinetTempSensor;
DHTesp controlCabinetTempSensor;

void initializeTemperatureSensor()
{
  minRotationSensor.setup(minRotation_PIN, DHTesp::DHT22);
  sys1Inverter3CabinetTempSensor.setup(sys1Inverter3CabinetTemp_PIN, DHTesp::DHT22);
  sys1Inverter6CabinetTempSensor.setup(sys1Inverter6CabinetTemp_PIN, DHTesp::DHT22);
  sys2Inverter3CabinetTempSensor.setup(sys2Inverter3CabinetTemp_PIN, DHTesp::DHT22);
  sys2Inverter4CabinetTempSensor.setup(sys2Inverter4CabinetTemp_PIN, DHTesp::DHT22);
  sys2Inverter7CabinetTempSensor.setup(sys2Inverter7CabinetTemp_PIN, DHTesp::DHT22);
  pitchCabinetBladeBTempSensor.setup(pitchCabinetBladeBTemp_PIN, DHTesp::DHT22);
  nacelleAmbientTemp1Sensor.setup(nacelleAmbientTemp1_PIN, DHTesp::DHT22);
  yawInverterCabinetTempSensor.setup(yawInverterCabinetTemp_PIN, DHTesp::DHT22);
  controlCabinetTempSensor.setup(controlCabinetTemp_PIN, DHTesp::DHT22);
}

void initializeWifi()
{
  Serial.print("Connecting to WiFi");

  WiFi.begin("Wokwi-GUEST", "", 6);
  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(100);
    Serial.print(".");
  }

  Serial.println(" Connected!");
}

const int LED_PIN = 2;
const int BUTTON_PIN = 5;

void initializeOutputLed()
{
  //Declaramos que el pin del led es de tipo salida, osea que la señal va salir
  pinMode(LED_PIN, OUTPUT);
}

void initializeButton()
{
  pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void setup() 
{
  /*
    Abre un Puerto serie y especifica la velocidad de transmisión. 

    La velocidad típica para comunicación con el ordenador es de 
    9600 aunque se pueden soportar otras velocidades.
  */
  Serial.begin(9600); 
  initializeWifi();
  initializeTemperatureSensor();
  initializeOutputLed();
  initializeButton();
}

// Helper Functions ---------------------------------------------------

//celcius
float getMinRotationSensor()
{
  TempAndHumidity data = minRotationSensor.getTempAndHumidity();
  return data.temperature;
}

float getSys1Inverter3CabinetTempSensor()
{
  TempAndHumidity data = sys1Inverter3CabinetTempSensor.getTempAndHumidity();
  return data.temperature;
}

float getSys1Inverter6CabinetTempSensor()
{
  TempAndHumidity data = sys1Inverter6CabinetTempSensor.getTempAndHumidity();
  return data.temperature;
}

float getSys2Inverter3CabinetTempSensor()
{
  TempAndHumidity data = sys2Inverter3CabinetTempSensor.getTempAndHumidity();
  return data.temperature;
}

float getSys2Inverter4CabinetTempSensor()
{
  TempAndHumidity data = sys2Inverter4CabinetTempSensor.getTempAndHumidity();
  return data.temperature;
}

float getSys2Inverter7CabinetTempSensor()
{
  TempAndHumidity data = sys2Inverter7CabinetTempSensor.getTempAndHumidity();
  return data.temperature;
}

float getPitchCabinetBladeBTempSensor()
{
  TempAndHumidity data = pitchCabinetBladeBTempSensor.getTempAndHumidity();
  return data.temperature;
}

float getNacelleAmbientTemp1Sensor()
{
  TempAndHumidity data = nacelleAmbientTemp1Sensor.getTempAndHumidity();
  return data.temperature;
}

float getYawInverterCabinetTempSensor()
{
  TempAndHumidity data = yawInverterCabinetTempSensor.getTempAndHumidity();
  return data.temperature;
}

float getControlCabinetTempSensor()
{
  TempAndHumidity data = controlCabinetTempSensor.getTempAndHumidity();
  return data.temperature;
}

void postData(float minRotation, float sys1Inverter3CabinetTemp,
  float sys1Inverter6CabinetTemp, float sys2Inverter3CabinetTemp,
  float sys2Inverter4CabinetTemp, float sys2Inverter7CabinetTemp,
  float pitchCabinetBladeBTemp, float nacelleAmbientTemp1,
  float yawInverterCabinetTemp, float controlCabinetTemp,
  int fault)
{
  HTTPClient http;
  //http.begin("https://EdgeAIServer.andresrodrigu.repl.co/");
  http.begin("https://edgeaiserversqlrefactored.andresrodrigu.repl.co/histories");
  http.addHeader("Content-Type", "application/json");

  String httpRequestData = "{";
  /*
  httpRequestData += 
    "\"MinRotation\":"+String(minRotation)+","+
    "\"Sys1Inverter3CabinetTemperature\":"+String(sys1Inverter3CabinetTemp)+","+
    "\"Sys1Inverter6CabinetTemperature\":"+String(sys1Inverter6CabinetTemp)+","+
    "\"Sys2Inverter3CabinetTemperature\":"+String(sys2Inverter3CabinetTemp)+","+
    "\"Sys2Inverter4CabinetTemperature\":"+String(sys2Inverter4CabinetTemp)+","+
    "\"Sys2Inverter7CabinetTemperature\":"+String(sys2Inverter7CabinetTemp)+","+
    "\"PitchCabinetBladeBTemperature\":"+String(sys2Inverter7CabinetTemp)+","+
    "\"NacelleAmbientTemperature1\":"+String(nacelleAmbientTemp1)+","+
    "\"YawInverterCabinetTemperature\":"+String(yawInverterCabinetTemp)+","+
    "\"ControlCabinetTemperature\":"+String(controlCabinetTemp)+","+
    "\"Fault\":"+String(fault)+
    "}";
  */

  httpRequestData += 
    "\"wind_turbine_id\":"+String(1)+","
    "\"wec_min_rotation\":"+String(minRotation)+","+
    "\"sys_1_inverter_3_cabinet_temp\":"+String(sys1Inverter3CabinetTemp)+","+
    "\"sys_1_inverter_6_cabinet_temp\":"+String(sys1Inverter6CabinetTemp)+","+
    "\"sys_2_inverter_3_cabinet_temp\":"+String(sys2Inverter3CabinetTemp)+","+
    "\"sys_2_inverter_4_cabinet_temp\":"+String(sys2Inverter4CabinetTemp)+","+
    "\"sys_2_inverter_7_cabinet_temp\":"+String(sys2Inverter7CabinetTemp)+","+
    "\"pitch_cabinet_blade_b_temp\":"+String(sys2Inverter7CabinetTemp)+","+
    "\"nacelle_ambient_temp_1\":"+String(nacelleAmbientTemp1)+","+
    "\"yaw_inverter_cabinet_temp\":"+String(yawInverterCabinetTemp)+","+
    "\"control_cabinet_temp\":"+String(controlCabinetTemp)+","+
    "\"state\":"+String(fault)+
    "}";  
  
  Serial.println("Posting Data....");
  int httpResponseCode = http.POST(httpRequestData);
  Serial.println("Data POSTed...."+String(httpResponseCode));
}

void classify() 
{
  float minRotation = getMinRotationSensor();
  float sys1Inverter3CabinetTemp = getSys1Inverter3CabinetTempSensor();
  float sys1Inverter6CabinetTemp = getSys1Inverter6CabinetTempSensor(); 
  float sys2Inverter3CabinetTemp = getSys2Inverter3CabinetTempSensor();
  float sys2Inverter4CabinetTemp = getSys2Inverter4CabinetTempSensor(); 
  float sys2Inverter7CabinetTemp = getSys2Inverter7CabinetTempSensor();
  float pitchCabinetBladeBTemp = getPitchCabinetBladeBTempSensor();
  float nacelleAmbientTemp1 = getNacelleAmbientTemp1Sensor();
  float yawInverterCabinetTemp = getYawInverterCabinetTempSensor(); 
  float controlCabinetTemp = getControlCabinetTempSensor();

  float x_sample[] = 
  { 
    minRotation,
    sys1Inverter3CabinetTemp,
    sys1Inverter6CabinetTemp,
    sys2Inverter3CabinetTemp,
    sys2Inverter4CabinetTemp,
    sys2Inverter7CabinetTemp,
    pitchCabinetBladeBTemp,
    nacelleAmbientTemp1,
    yawInverterCabinetTemp,
    controlCabinetTemp
  };

  int predicted = classifier.predict(x_sample);

  Serial.print("Predicted class: ");
  Serial.println(predicted);

  postData(
    minRotation,
    sys1Inverter3CabinetTemp,
    sys1Inverter6CabinetTemp,
    sys2Inverter3CabinetTemp,
    sys2Inverter4CabinetTemp,
    sys2Inverter7CabinetTemp,
    pitchCabinetBladeBTemp,
    nacelleAmbientTemp1,
    yawInverterCabinetTemp,
    controlCabinetTemp,
    predicted
  );
}

void turnOnLed()
{
  digitalWrite(LED_PIN, HIGH);
}

void turnOffLed()
{
  digitalWrite(LED_PIN, LOW);
}

void GET()
{
  if ((WiFi.status() == WL_CONNECTED)) 
  { 
    HTTPClient http;
    http.begin("https://EdgeAIServer.andresrodrigu.repl.co"); 
    int httpCode = http.GET();                                        
  
    if (httpCode > 0)
    { 
      String payload = http.getString();
      Serial.println(httpCode);
      Serial.println(payload);
    }
  
    else 
    {
      Serial.println("Error on HTTP request");
      Serial.println(httpCode);
    }
  }
  else
  {
    Serial.println("GET Request error, WIFI is OFF...");
  }
}

// LOOP ---------------------------------------------------------------------

void loop() 
{
  if(digitalRead(BUTTON_PIN) == 0)
  {
    turnOnLed();
    //float temperature = getControlCabinetTempSensor();
    //Serial.println("Control Cabinet Temp: " + String(temperature, 2) + "°C");

    classify();

    turnOffLed();
  }
  
  //GET();
  //delay(100);
}