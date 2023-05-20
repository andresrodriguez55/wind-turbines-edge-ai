#include <WiFi.h>
#include <HTTPClient.h>
#include "DHTesp.h"
#include "model.h"
#include <vector>
#include <map>

Eloquent::ML::Port::DecisionTree classifier;

HTTPClient http;

struct SensorPin 
{
  String name;
  int pin;
};

std::vector<SensorPin> sensorPins = 
{
  {"wec_min_rotation", 13},
  {"sys_1_inverter_3_cabinet_temp", 12},
  {"sys_1_inverter_6_cabinet_temp", 14},
  {"sys_2_inverter_3_cabinet_temp", 27},
  {"sys_2_inverter_4_cabinet_temp", 26},
  {"sys_2_inverter_7_cabinet_temp", 15},
  {"pitch_cabinet_blade_b_temp", 23},
  {"nacelle_ambient_temp_1", 22},
  {"yaw_inverter_cabinet_temp", 21},
  {"control_cabinet_temp", 18},
};

std::map<String, DHTesp> sensors;

void initializeTemperatureSensors()
{
  for (const auto& sensorPin : sensorPins) 
  {
    DHTesp sensor;
    sensor.setup(sensorPin.pin, DHTesp::DHT22);
    sensors[sensorPin.name] = sensor;
  }
}

float getTemperature(const String& sensorName) 
{
  TempAndHumidity data = sensors[sensorName].getTempAndHumidity();
  return data.temperature;
}

void initializeWifi() 
{
  Serial.print("Connecting to WiFi");
  WiFi.begin("Wokwi-GUEST", "", 6);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  Serial.println(" Connected!");
}

const int LED_PIN = 2;
const int BUTTON_PIN = 5;

void initializeOutputLed() 
{
  pinMode(LED_PIN, OUTPUT);
}

void initializeButton() 
{
  pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void setup() 
{
  Serial.begin(9600);
  http.setReuse(true);
  initializeWifi();
  initializeTemperatureSensors();
  initializeOutputLed();
  initializeButton();
}

void postData(float sensorValues[], int windTurbineId) 
{
  http.begin("https://edgeaiserversqlrefactored.andresrodrigu.repl.co/histories");
  http.addHeader("Content-Type", "application/json");

  String httpRequestData = "{";
  httpRequestData += "\"wind_turbine_id\": " + String(windTurbineId) + ",";

  for (size_t index = 0; index < sensorPins.size(); ++index) 
  {
    String sensorName = sensorPins[index].name;
    float value = sensorValues[index];

    httpRequestData += "\"" + sensorName + "\": " + String(value);
    httpRequestData += ",";
  }

  String prediction = String(classifier.predict(sensorValues));
  Serial.println("Prediction result: " + prediction);

  httpRequestData += "\"state\": " + prediction + "}";
  Serial.println("Posting Data....");
  int httpResponseCode = http.POST(httpRequestData);
  Serial.println("Data POSTed. Response code: " + String(httpResponseCode));
}

void updateSensorValues(float sensorValues[]) 
{
  for (size_t index = 0; index < sensorPins.size(); ++index)
   
   {
    float temperature = getTemperature(sensorPins[index].name);
    sensorValues[index] = temperature;
  }
}

void turnOnLed() 
{
  digitalWrite(LED_PIN, HIGH);
}

void turnOffLed() 
{
  digitalWrite(LED_PIN, LOW);
}

float* createSensorValuesArray() 
{
  size_t sensorCount = sensorPins.size();
  float* sensorValues = new float[sensorCount];
  return sensorValues;
}

void loop() 
{
  if (digitalRead(BUTTON_PIN) == 0) {
    turnOnLed();
    float* sensorValues = createSensorValuesArray();
    updateSensorValues(sensorValues);
    postData(sensorValues, 1);  // Pass the wind turbine ID as an argument
    delete[] sensorValues;
    turnOffLed();
  }
  delay(100);
}