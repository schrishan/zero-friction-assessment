import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressType, ContactDetailType, OrganizationDetailType, OrganizationConfigType } from '../../types/organisation-config';

interface OrganizationConfigState {
  data: OrganizationConfigType;
}

export const initialState: OrganizationConfigState = {
  data: {
    organizationDetail: {
      migrationMode: false,
      code: '',
      description: '',
      bankAccount: '',
      vatAccountNumber: '',
      companyAccountNumber: ''
    },
    contactDetails: {
      emailAddress: '',
      telephone: '',
      website: '',
    },
    address: {
      streetName: '',
      streetNumber: 0,
      postalCode: 0,
      city: '',
      country: '',
    },
  },
};

const organizationConfigSlice = createSlice({
  name: 'organizationConfig',
  initialState,
  reducers: {
    updateOrganizationDetails: (state, action: PayloadAction<OrganizationDetailType>) => {
      state.data.organizationDetail = action.payload;
    },
    updateContactDetails: (state, action: PayloadAction<ContactDetailType>) => {
      state.data.contactDetails = action.payload;
    },
    updateAddress: (state, action: PayloadAction<AddressType>) => {
      state.data.address = action.payload;
    },
    // resetOrganizationConfig: (state, action: PayloadAction<OrganizationConfigType>) => {
    //   state.data = initialState.data;
    // },
    resetOrganizationConfig: (state, action: PayloadAction<OrganizationConfigType>) => {
      state.data = action.payload;
    },
    hi: () => {
      alert('ddf');
    },
  },
});


export const { updateOrganizationDetails, updateContactDetails, updateAddress, resetOrganizationConfig,  } = organizationConfigSlice.actions;

export default organizationConfigSlice.reducer;
