'use client';

import React, { Fragment, useMemo, useCallback } from 'react';
import { Form } from 'formik';
import FormControl, { IFormControl } from './FormControl';
import Button, { IButton } from '@/components/atoms/Button';
import { cloneDeepData } from '@/utils/helpers';

export type ViewOderColumn = 1 | 2;
export interface IFormSettings extends IFormControl {
  viewOrder?: ViewOderColumn
  viewRow?: number
}

interface IFormSettingProps {
  formSettings: IFormSettings[]
  submitButton?: IButton
}

const FormSettings = ({ formSettings, submitButton }: IFormSettingProps) => {
  const compare = (a: IFormSettings, b: IFormSettings) => {
    if (a.viewOrder && b.viewOrder) {
      if (a.viewOrder < b.viewOrder) {
        return -1;
      }
      if (a.viewOrder > b.viewOrder) {
        return 1;
      }
    }
    return 0;
  };

  const getFormSettings = useCallback((): IFormSettings[] => {
    if (!formSettings || !formSettings.length) {
      return [];
    }

    const fs: IFormSettings[] = cloneDeepData(formSettings || []);
    const fsViewRows = fs.filter((item) => item.viewRow);
    const viewRowHighest: number =
      fsViewRows?.length ? Math.max(...fsViewRows.map(o => o.viewRow || 0)) : 0;
    const fsNotViewRow = fs.filter((item) => !item.viewRow)
      ?.map((item, index) => {
        item.viewRow = viewRowHighest + index + 1;
        return item;
      });
    return [ ...fsViewRows, ...fsNotViewRow ];
  }, [ formSettings ]);

  const getViewRows = useCallback((): number[] => {
    const returnData: number[] = [];
    const fs: IFormSettings[] = getFormSettings();

    fs.forEach((fsItem) => {
      if (fsItem?.viewRow && returnData.indexOf(fsItem.viewRow) === -1) {
        returnData.push(fsItem.viewRow);
      }
    });

    return returnData?.sort((a, b) => a - b);
  }, [ getFormSettings ]);

  const renderColumnField = useCallback((fs: IFormSettings, viewColumn: ViewOderColumn) => {
    const flexColumn: string = viewColumn === 2 ? 'sm:basis-[50%] sm:max-w-[50%]' : '';
    return (
      <div
        key={fs.name}
        className={
          'flex flex-col grow-[0] shrink-[0] pl-[15px] pr-[15px] basis-[100%] max-w-[100%] ' + flexColumn}
      >
        <FormControl {...fs} />
      </div>
    );
  }, []);

  const renderRowField = useCallback(() => {
    const fs: IFormSettings[] = getFormSettings();
    return getViewRows()?.map?.((numberView: number) => {
      const dataViewRows = fs.filter(
        (item) => item.viewRow === numberView
      )?.sort(compare);

      return (
        <div key={numberView} className={'flex flex-wrap ml-[-15px] mr-[-15px]'}>
          {dataViewRows.map((fsData) => {
            return renderColumnField(
              fsData,
              dataViewRows.length as ViewOderColumn
            );
          })}
        </div>
      );
    });
  }, [ getFormSettings, getViewRows, renderColumnField ]);

  const renderButtonSubmit = useMemo(() => {
    return submitButton
      ? (
        <div className={'text-center'}>
          <Button
            text={submitButton.text}
            typeHTML={submitButton?.typeHTML || 'button'}
            type={submitButton?.type}
            size={submitButton?.size}
            disabled={submitButton?.disabled}
          />
        </div>
      ) : (
        <Fragment/>
      );
  }, [ submitButton ]);

  return useMemo(() => {
    return (
      <Form>
        {renderRowField()}
        {renderButtonSubmit}
      </Form>
    );
  }, [ renderRowField, renderButtonSubmit ]);
};

export default FormSettings;
