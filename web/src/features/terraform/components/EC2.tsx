import { Button, HStack } from "@chakra-ui/react";
import { FormProvider } from "react-hook-form";
import CheckBox from "../../../components/internal-ui/CheckBox";
import {
  Endpoints,
  terraformEc2DefaultValues,
  TerraformEC2Fields,
} from "../../constants";
import { ApiRequestTerraformEc2, TerraformEc2FormData } from "../../model";

import { terraformEC2Mapper } from "../../../utils/mapperFunctions";
import useTerraFormHandler from "../hooks";

const EC2 = () => {
  const { formMethods, handleSubmit, onSubmit, isSuccess, isError } =
    useTerraFormHandler<TerraformEc2FormData, ApiRequestTerraformEc2>(
      terraformEc2DefaultValues,
      Endpoints.POST_IAC_T_EC2
    );

  const handleFormSubmit = handleSubmit((data) =>
    onSubmit(terraformEC2Mapper(data))
  );

  return (
    <div className="flex flex-col ">
      <FormProvider {...formMethods}>
        <form onSubmit={handleFormSubmit}>
          <div className="flex justify-between w-full border border-orange-300 p-8">
            <HStack gap={5}>
              <p className="font-bold">EC2 service: </p>
              <CheckBox
                fieldName={TerraformEC2Fields.KEY_PAIR}
                label="Key pair?"
              />
              <CheckBox
                fieldName={TerraformEC2Fields.SECURITY_GROUP}
                label="Security group?"
              />
              <CheckBox
                fieldName={TerraformEC2Fields.AWS_INSTANCE}
                label="AWS instance?"
              />
              <CheckBox
                fieldName={TerraformEC2Fields.AMI_FROM_INSTANCE}
                label="AMI from instance?"
              />
            </HStack>
            <Button type="submit" bg="orange.700" w="8rem" h="3rem">
              Generate
            </Button>
          </div>
        </form>
      </FormProvider>
      {isSuccess && <p className="text-green-600">Generated Succesfully</p>}
      {isError && <p className="text-red-700">Operation failed</p>}
    </div>
  );
};

export default EC2;