
#include "DHT.h"

//----------------------Pines----------------------
const int hygrometer = A0;
#define DHTPIN 2


//----------------------Pines----------------------
//----------------------Otros----------------------
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
//----------------------Otros----------------------
//--------------------Variables--------------------
int value;
float h;
float t;
float f;
//--------------------Variables--------------------

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  readTemperatureHumidity();
  readHumiditySoil();
  delay(5000);
}

//Hygrometer
void readHumiditySoil()
{
  value = analogRead(hygrometer);   //Read analog value 
  value = constrain(value,400,1023);  //Keep the ranges!
  value = map(value,400,1023,100,0);  //Map value : 400 will be 100 and 1023 will be 0
  Serial.print("Soil humidity: ");
  Serial.print(value);
  Serial.println("%");
}

//Sensor de humedad y temperatura
void readTemperatureHumidity()
{
  h = dht.readHumidity();
  t = dht.readTemperature();
  f = dht.readTemperature(true);
  
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
  }

  else
  {
    float hif = dht.computeHeatIndex(f, h);
    float hic = dht.computeHeatIndex(t, h, false);

    Serial.print(F("Humidity: "));
    Serial.print(h);
    Serial.print(F("%  Temperature: "));
    Serial.print(t);
    Serial.print(F("°C "));
    Serial.print(f);
    Serial.print(F("°F  Heat index: "));
    Serial.print(hic);
    Serial.print(F("°C "));
    Serial.print(hif);
    Serial.println(F("°F"));
  }
}