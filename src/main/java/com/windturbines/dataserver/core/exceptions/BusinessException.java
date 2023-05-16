package com.windturbines.dataserver.core.exceptions;

public class BusinessException extends RuntimeException
{
    public BusinessException(String message)
    {
        super(message);
    }
}
