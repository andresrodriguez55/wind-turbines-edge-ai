from typing import List, Optional
from pydantic import BaseModel, validator
from datetime import datetime
from pydantic.main import ModelMetaclass

class HistoryBase(BaseModel):
  wind_turbine_id: int
  state: int  

  """ wec_ava_windspeed: float
  wec_max_windspeed: float
  wec_min_windspeed: float
  wec_ava_rotation: float
  wec_max_rotation: float """
  wec_min_rotation: float
  """ wec_ava_power: float
  wec_max_power: float
  wec_min_power: float
  wec_ava_nacel_position_including_cable_twisting: float
  wec_operating_hours: float
  wec_production_kwh: float
  wec_production_minutes: float
  wec_ava_reactive_power: float
  wec_max_reactive_power: float
  wec_min_reactive_power: float
  wec_ava_available_p_from_wind: float
  wec_ava_available_p_technical_reasons: float
  wec_ava_available_p_force_majeure_reasons: float
  wec_ava_blade_angle_a: float
  sys_1_inverter_1_cabinet_temp: float
  sys_1_inverter_2_cabinet_temp: float"""
  sys_1_inverter_3_cabinet_temp: float
  """ sys_1_inverter_4_cabinet_temp: float
  sys_1_inverter_5_cabinet_temp: float """
  sys_1_inverter_6_cabinet_temp: float
  """ sys_1_inverter_7_cabinet_temp: float
  sys_2_inverter_1_cabinet_temp: float
  sys_2_inverter_2_cabinet_temp: float """
  sys_2_inverter_3_cabinet_temp: float
  sys_2_inverter_4_cabinet_temp: float
  """ sys_2_inverter_5_cabinet_temp: float
  sys_2_inverter_6_cabinet_temp: float """
  sys_2_inverter_7_cabinet_temp: float 
  """ spinner_temp: float
  front_bearing_temp: float
  rear_bearing_temp: float
  pitch_cabinet_blade_a_temp: float """
  pitch_cabinet_blade_b_temp: float
  """ pitch_cabinet_blade_c_temp: float
  blade_a_temp: float
  blade_b_temp: float
  blade_c_temp: float
  rotor_temp_1: float
  rotor_temp_2: float
  stator_temp_1: float
  stator_temp_2: float """
  nacelle_ambient_temp_1: float
  """ nacelle_ambient_temp_2: float
  nacelle_temp: float
  nacelle_cabinet_temp: float
  main_carrier_temp: float
  rectifier_cabinet_temp: float """
  yaw_inverter_cabinet_temp: float
  """ fan_inverter_cabinet_temp: float
  ambient_temp: float
  tower_temp: float """
  control_cabinet_temp: float
  """ transformer_temp: float
  rtu_ava_setpoint_1: float
  inverter_averages: float
  inverter_std_dev: float """


class HistoryCreate(HistoryBase):
  pass

class History(HistoryBase):
  id: int
  generated_at: datetime
  
  class Config:
    orm_mode = True
