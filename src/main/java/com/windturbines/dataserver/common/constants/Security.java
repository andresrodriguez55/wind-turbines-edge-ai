package com.windturbines.dataserver.common.constants;

public class Security
{
    public static String SECRET_KEY = "java";
    public static int EXPIRED_DAY = 5  * 24 * 60 * 60 * 1000;
    public static String SECURITY_HEADER = "Authorization";
    public static String SECURITY_WITH_START_TOKEN = "Bearer ";
}