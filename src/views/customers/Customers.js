/* eslint-disable no-unused-vars */
import React, { lazy, useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CDataTable,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CTextarea
} from '@coreui/react'
import Swal from 'sweetalert2'
import axios from 'axios'


// const getBadge = status => {
//   switch (status) {
//     case 'Active': return 'success'
//     case 'Inactive': return 'secondary'
//     case 'Pending': return 'warning'
//     case 'Banned': return 'danger'
//     default: return 'primary'
//   }
// }

const fields = [
  'merchant_name',
  'contact_phone',
  'contact_email',
  'type_of_business',
  'location',
  'business_description',

  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }
];


const Customers = () => {

  const [details, setDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [merchantToUpdate, setMerchantToUpdate] = useState(null);



  const [merchantData, setMerchantData] = useState({
    id: crypto.randomUUID(),
    merchant_name: "",
    contact_phone: "",
    contact_email: "",
    type_of_business: "",
    location: "",
    business_description: "",
  });


  const [merchants, setMerchants] = useState([]);
  const [isAddMerchant, setIsAddMerchant] = useState(true);


  useEffect(() => {
    console.log("merchantToUpdate", merchantToUpdate);
    if (merchantToUpdate !== null) {
      setMerchantData(merchantToUpdate);
      setIsAddMerchant(false);
    } else {
      setMerchantData({
        id: crypto.randomUUID(),
        merchant_name: "",
        contact_phone: "",
        contact_email: "",
        type_of_business: "",
        location: "",
        business_description: "",
      });
      setIsAddMerchant(true);
    }
  }, [merchantToUpdate]);


  useEffect(() => {
    dataFetch()
  }, []);


  //fetch data usin react query
  const dataFetch = async () => {
    try {
      const response = await axios.get('http://localhost:5001/merchants');
      setMerchants(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const handleAddMerchant = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMerchantData({ ...merchantData, [name]: value });
  };

  const handleUpdateMerchant = (merchant) => {
    console.log(merchant);
    setMerchantToUpdate(merchant);
    setShowModal(true);
  };

  const handleSaveMerchant = async (isAddMerchant) => {
    if (isAddMerchant) {
      setMerchants([...merchants, merchantData]);
    } else {
      setMerchants(
        merchants.map((item) => {
          if (item.id === merchantData.id) {
            return merchantData;
          }
          return item;
        })
      );
    }

    await postMerchantData(merchantData);

    setShowModal(false);
    setMerchantData({
      id: crypto.randomUUID(),
      merchant_name: "",
      contact_phone: "",
      contact_email: "",
      type_of_business: "",
      location: "",
      business_description: "",
    });
  };


  const postMerchantData = async (merchantData) => {
    try {
      const response = await fetch('http://localhost:5001/merchants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(merchantData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Merchant added successfully:', result);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Merchant Inserted',
          showConfirmButton: false,
          timer: 1500,
        });

        return true;
      } else {
        console.error('Failed to add merchant:', response.statusText);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Failed to add merchant: ${response.statusText}`,
        });

        return false;
      }
    } catch (error) {
      console.error('Error adding merchant:', error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error adding merchant: ${error.message}`,
      });

      return false;
    }
  };


  const handleDeleteMerchant = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const filterAfterDelete = merchants.filter(item => item.id !== id);
        setMerchants(filterAfterDelete);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="Custom-CCardHeader">
              Orders
              <CButton
                color="primary"
                className="float-right text-light"
                onClick={handleAddMerchant}
              >
                Add Merchant
              </CButton>
              {/* <!-- Modal --> */}
              {showModal && (
                <div
                  className="modal fade show"
                  id="staticBackdrop"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                  style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          {isAddMerchant ? 'Add Merchant' : 'Edit Merchant'}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-coreui-dismiss="modal"
                          aria-label="Close"
                          onClick={handleCloseModal}
                        >X</button>
                      </div>
                      <div className="modal-body">
                        <CForm>
                          <CFormGroup>
                            <CLabel htmlFor="merchant_name">Merchant Name</CLabel>
                            <CInput
                              id="merchant_name"
                              name="merchant_name"
                              value={merchantData.merchant_name}
                              onChange={handleChange}
                              placeholder="Enter merchant name"
                            />
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="contact_information">Contact Information</CLabel>
                            <CInput
                              id="contact_phone"
                              name="contact_phone"
                              value={merchantData.contact_phone}
                              onChange={handleChange}
                              placeholder="Enter phone number"
                            />
                            <CInput
                              id="contact_email"
                              name="contact_email"
                              value={merchantData.contact_email}
                              onChange={handleChange}
                              placeholder="Enter email address"
                              style={{ marginTop: '10px' }}
                            />
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="type_of_business">Type of Business</CLabel>
                            <CInput
                              id="type_of_business"
                              name="type_of_business"
                              value={merchantData.type_of_business}
                              onChange={handleChange}
                              placeholder="Enter type of business"
                            />
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="location">Location</CLabel>
                            <CInput
                              id="location"
                              name="location"
                              value={merchantData.location}
                              onChange={handleChange}
                              placeholder="Enter location"
                            />
                          </CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="business_description">Business Description</CLabel>
                            <CTextarea
                              id="business_description"
                              name="business_description"
                              rows="3"
                              value={merchantData.business_description}
                              onChange={handleChange}
                              placeholder="Enter business description"
                            />
                          </CFormGroup>
                        </CForm>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-coreui-dismiss="modal"
                          onClick={handleCloseModal}
                        >
                          Close
                        </button>
                        <button onClick={() => handleSaveMerchant(isAddMerchant)} type="button" className="btn btn-primary">
                          {isAddMerchant ? 'Add' : 'Update'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              )}
            </CCardHeader>

            <CCardBody>
              <CDataTable
                items={merchants}
                fields={fields}
                tableFilter
                hover
                sorter
                striped
                bordered
                itemsPerPageSelect
                itemsPerPage={20}
                pagination
                scopedSlots={{
                  'merchant_name':
                    (item) => (
                      <td>
                        <div>{item.merchant_name}</div>
                        <div className="small text-muted">
                          <span>{item.type_of_business}</span>
                        </div>
                      </td>
                    ),
                  // 'status':
                  //   (item) => (
                  //     <td>
                  //       <CBadge color={getBadge(item.status)}>
                  //         {item.status}
                  //       </CBadge>
                  //     </td>
                  //   ),
                  'show_details':
                    (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => { toggleDetails(index) }}
                          >
                            {details.includes(index) ? 'Hide' : 'Show'}
                          </CButton>
                        </td>
                      )
                    },
                  'details':
                    (item, index) => {
                      return (
                        <CCollapse show={details.includes(index)}>
                          <CCardBody>
                            <h4>
                              {item.merchant_name}
                            </h4>
                            <p className="text-muted">
                              Phone: {item.contact_phone}<br />
                              Email: {item.contact_email}<br />
                              Type of Business: {item.type_of_business}<br />
                              Location: {item.location}<br />
                              Business Description: {item.business_description}<br />
                            </p>
                            <CButton onClick={() => handleUpdateMerchant(item)} size="sm" color="info">
                              Update
                            </CButton>
                            <CButton onClick={() => handleDeleteMerchant(item.id)} size="sm" color="danger" className="ml-1">
                              Delete
                            </CButton>
                          </CCardBody>
                        </CCollapse>
                      )
                    }
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Customers
