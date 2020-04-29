using System;
using System.Collections.Generic;
using System.Text;

namespace Project_IDA.DTO.Models.Result
{
    public class ResultSingleDto<T>:ResultDto
    {
        public T Data { get; set; }
    }
}
