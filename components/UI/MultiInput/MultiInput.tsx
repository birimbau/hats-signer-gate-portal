import {
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import Input from '../CustomInput/CustomInput';
import { HiMinus } from 'react-icons/hi';
import { BsPlusLg } from 'react-icons/bs';
import * as S from './MultiInput.styled';

interface P {
  values: any[];
  label: string;
  countLabel: string;
  placeholder: string;
  name: string;
  type?: string;
  width?: string;
  isDisabled?: boolean;
  minAmountOfValues?: number;
}

import { FieldArray, FieldArrayRenderProps } from 'formik';

const MultiInput: React.FC<P> = (p) => {
  return (
    <FieldArray name={p.name}>
      {({ push, remove, form }: FieldArrayRenderProps) => (
        <FormControl
          isInvalid={!!(form.errors[p.name] && form.touched[p.name])}
        >
          <VStack gap={'13px'} alignItems="flex-start" width={p.width}>
            {form.values[p.name].map((v: string, i: number) => (
              <Input
                key={i}
                label={`${p.label} [${p.countLabel}${i + 1}] (integer)`}
                type={p.type || 'text'}
                name={`${p.name}[${i}]`}
                value={v.toString()}
                placeholder={p.placeholder}
                _placeholder={{
                  fontSize: '14px',
                }}
                width={'100%'}
                isDisabled={p.isDisabled}
                onChange={(e) => {
                  form.setFieldValue(`${p.name}[${i}]`, e.target.value);
                }}
                extra={
                  <>
                    <HStack gap="8px">
                      {i > 0 && (
                        <S.IconButtonStyled
                          aria-label="remove value"
                          icon={<HiMinus />}
                          size="xs"
                          isDisabled={
                            form.values[p.name].length >=
                              (p.minAmountOfValues || 0) || p.isDisabled
                          }
                          onClick={() => {
                            remove(i);
                          }}
                        />
                      )}
                      {i === form.values[p.name].length - 1 && (
                        <S.IconButtonStyled
                          aria-label="Add value"
                          icon={<BsPlusLg />}
                          size="xs"
                          isDisabled={!form.values[p.name][i] || p.isDisabled}
                          onClick={() => push('')}
                        />
                      )}
                    </HStack>
                  </>
                }
              />
            ))}
            {/* Make sure all errors are created as strings in YupValidation */}
            <FormErrorMessage>{form.errors[p.name] as string}</FormErrorMessage>
          </VStack>
        </FormControl>
      )}
    </FieldArray>
  );
};

export default MultiInput;

// interface P {
//   values: any[];
//   label: string;
//   countLabel: string;
//   placeholder: string;
//   name: string;
//   type?: string;
//   width?: string;
//   isDisabled?: boolean;
//   minAmountOfValues?: number;
//   onChange: (
//     value: string,
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => void;
//   onClickAdd: (value: string, index: number) => void;
//   onClickRemove: (value: string, index: number) => void;
// }

// const MultiInput: React.FC<P> = (p) => {
//   const values = (p.values || []).length === 0 ? [''] : p.values;
//   const minAmountOfValues = p.minAmountOfValues || 0;

//   return (
//     <VStack gap={'13px'} alignItems="flex-start" width={p.width}>
//       {values.map((v, i) => {
//         return (
//           <Input
//             key={i}
//             label={`${p.label} [${p.countLabel}${i + 1}] (integer)`}
//             type={p.type || 'text'}
//             name={`${p.name}[${i}]`}
//             value={v.toString()}
//             placeholder={p.placeholder}
//             _placeholder={{
//               fontSize: '14px',
//             }}
//             width={'100%'}
//             isDisabled={p.isDisabled}
//             onChange={(e) => p.onChange(v, i, e)}
//             extra={
//               <>
//                 <HStack gap="8px">
//                   {i > 0 && (
//                     <S.IconButtonStyled
//                       aria-label="remove value"
//                       icon={<HiMinus />}
//                       size="xs"
//                       isDisabled={
//                         values.length >= minAmountOfValues || p.isDisabled
//                       }
//                       onClick={() => {
//                         p.onClickRemove(v, i);
//                       }}
//                     />
//                   )}
//                   {i === values.length - 1 && (
//                     <S.IconButtonStyled
//                       aria-label="Add value"
//                       icon={<BsPlusLg />}
//                       size="xs"
//                       isDisabled={!values[i] || p.isDisabled}
//                       onClick={() => p.onClickAdd(v, i)}
//                     />
//                   )}
//                 </HStack>
//               </>
//             }
//           />
//         );
//       })}
//     </VStack>
//   );
// };

// export default MultiInput;
