export class BaseResponse<T> {
  status: boolean;
  businessDescription: string;
  businessCode: number;
  data?: T;

  constructor(
    status: boolean,
    businessCode: number,
    businessDescription: string,
    data?: T,
  ) {
    this.businessCode = businessCode;
    this.businessDescription = businessDescription;
    this.data = data;
  }

  public static success<T>(
    businessCode: number,
    businessDescription: string,
    data?: T,
  ): BaseResponse<T> {
    return new BaseResponse(true, businessCode, businessDescription, data);
  }

  public static error<T>(
    businessCode: number,
    businessDescription: string,
  ): BaseResponse<T> {
    return new BaseResponse(false, businessCode, businessDescription);
  }
}
