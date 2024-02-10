type responseInterface = {
  statusCode: number;
  messageEn: string;
  data: any;
};

export const Responser = ({
  statusCode,
  messageEn,
  data,
}: responseInterface) => {
  return {
    _meta: {
      success: statusCode >= 200 && statusCode <= 300 ? true : false,
      messageEn: messageEn,
    },
    _data: data,
  };
};
