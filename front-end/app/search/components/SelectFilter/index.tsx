'use client';

import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  placeholder: string;
  filter: string;
  items: string[];
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function SelectFilter({ placeholder, items, filter }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const [value, setValue] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const { target } = event;
    setValue(typeof target.value === 'string' ? target.value.split(',') : target.value);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.length === 0) {
      params.delete(filter);
      router.push(`/search?${params.toString()}`);
      return;
    }

    params.set(filter, value.join(','));
    router.push(`/search?${params.toString()}`);
  }, [value]);

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <MuiSelect
          size="small"
          multiple
          displayEmpty
          value={value}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{placeholder}</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>

          {items.map((item, index) => (
            <MenuItem key={index} value={item} style={getStyles(item, value, theme)}>
              {item}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </div>
  );
}
