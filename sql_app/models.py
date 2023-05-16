import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, Float, DateTime, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.orm import validates
from db import Base

class WindTurbine(Base):
  __tablename__ = "wind_turbine"

  id = Column(Integer, primary_key=True, autoincrement=True)
  latitude = Column(Float(precision=15), nullable=False)
  longitude = Column(Float(precision=15), nullable=False)


class History(Base):
  __tablename__ = "history"

  id = Column(Integer, primary_key=True, autoincrement=True)
  wind_turbine_id = Column(Integer, ForeignKey('wind_turbine.id'))
  generated_at = Column(DateTime(timezone=True),
                server_default=func.now(),
                default=datetime.datetime.now)
  state = Column(Integer, nullable=False)

  wec_ava_windspeed = Column(Float(precision=15), nullable=True)
  wec_max_windspeed = Column(Float(precision=15), nullable=True)
  wec_min_windspeed = Column(Float(precision=15), nullable=True)
  wec_ava_rotation = Column(Float(precision=15), nullable=True)
  wec_max_rotation = Column(Float(precision=15), nullable=True)
  wec_min_rotation = Column(Float(precision=15), nullable=True)
  wec_ava_power = Column(Float(precision=15), nullable=True)
  wec_max_power = Column(Float(precision=15), nullable=True)
  wec_min_power = Column(Float(precision=15), nullable=True)
  wec_ava_nacel_position_including_cable_twisting = Column(Float(precision=15), nullable=True)
  wec_operating_hours = Column(Float(precision=15), nullable=True)
  wec_production_kwh = Column(Float(precision=15), nullable=True)
  wec_production_minutes = Column(Float(precision=15), nullable=True)
  wec_ava_reactive_power = Column(Float(precision=15), nullable=True)
  wec_max_reactive_power = Column(Float(precision=15), nullable=True)
  wec_min_reactive_power = Column(Float(precision=15), nullable=True)
  wec_ava_available_p_from_wind = Column(Float(precision=15), nullable=True)
  wec_ava_available_p_technical_reasons = Column(Float(precision=15), nullable=True)
  wec_ava_available_p_force_majeure_reasons = Column(Float(precision=15), nullable=True)
  wec_ava_blade_angle_a = Column(Float(precision=15), nullable=True)

  sys_1_inverter_1_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_1_inverter_2_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_1_inverter_3_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_1_inverter_4_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_1_inverter_5_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_1_inverter_6_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_1_inverter_7_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_2_inverter_1_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_2_inverter_2_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_2_inverter_3_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_2_inverter_4_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_2_inverter_5_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_2_inverter_6_cabinet_temp = Column(Float(precision=15), nullable=True)
  sys_2_inverter_7_cabinet_temp = Column(Float(precision=15), nullable=True)

  spinner_temp = Column(Float(precision=15), nullable=True)
  front_bearing_temp = Column(Float(precision=15), nullable=True)
  rear_bearing_temp = Column(Float(precision=15), nullable=True)
  pitch_cabinet_blade_a_temp = Column(Float(precision=15), nullable=True)
  pitch_cabinet_blade_b_temp = Column(Float(precision=15), nullable=True)
  pitch_cabinet_blade_c_temp = Column(Float(precision=15), nullable=True)
  blade_a_temp = Column(Float(precision=15), nullable=True)
  blade_b_temp = Column(Float(precision=15), nullable=True)

  blade_c_temp = Column(Float(precision=15), nullable=True)
  rotor_temp_1 = Column(Float(precision=15), nullable=True)
  rotor_temp_2 = Column(Float(precision=15), nullable=True)
  stator_temp_1 = Column(Float(precision=15), nullable=True)
  stator_temp_2 = Column(Float(precision=15), nullable=True)
  nacelle_ambient_temp_1 = Column(Float(precision=15), nullable=True)
  nacelle_ambient_temp_2 = Column(Float(precision=15), nullable=True)
  nacelle_temp = Column(Float(precision=15), nullable=True)
  nacelle_cabinet_temp = Column(Float(precision=15), nullable=True)
  main_carrier_temp = Column(Float(precision=15), nullable=True)
  rectifier_cabinet_temp = Column(Float(precision=15), nullable=True)
  yaw_inverter_cabinet_temp = Column(Float(precision=15), nullable=True)
  fan_inverter_cabinet_temp = Column(Float(precision=15), nullable=True)
  ambient_temp = Column(Float(precision=15), nullable=True)
  tower_temp = Column(Float(precision=15), nullable=True)
  control_cabinet_temp = Column(Float(precision=15), nullable=True)
  transformer_temp = Column(Float(precision=15), nullable=True)
  rtu_ava_setpoint_1 = Column(Float(precision=15), nullable=True)
  inverter_averages = Column(Float(precision=15), nullable=True)
  inverter_std_dev = Column(Float(precision=15), nullable=True)