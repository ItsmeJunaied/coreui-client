/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CCollapse,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CTextarea,
  CSelect
} from '@coreui/react'
import { object } from 'prop-types'
import Swal from 'sweetalert2'
import axios from 'axios'

// import ordersData from './OrderData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}


const fields = [
  'merchant',
  'receiver',
  { key: 'location', _style: { width: '20%' } },
  { key: 'order_date', _style: { width: '20%' } },
  { key: 'delivery_date', _style: { width: '20%' } },
  { key: 'updated_date', _style: { width: '20%' } },
  { key: 'price', _style: { width: '10%' } },
  { key: 'note', _style: { width: '20%' } },
  { key: 'status', _style: { width: '20%' } },
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }
]

const Orders = () => {

  const [details, setDetails] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [merchantName, setMerchantName] = useState(null);
  console.log("orderToUpdate", orderToUpdate)

  const [ordersData, setOrdersData] = useState({
    id: crypto.randomUUID(),
    merchant: "",
    receiver: "",
    location: "",
    order_date: "",
    delivery_date: "",
    updated_date: new Date().toISOString().split('T')[0],
    price: "",
    note: "",
    status: "pending",
  });

  // Update the updated_date field to current date on component mount
  useEffect(() => {
    setOrdersData(prevData => ({
      ...prevData,
      updated_date: new Date().toISOString().split('T')[0]
    }));
  }, []);

  console.log("ordersData", ordersData)
  const [orders, setOrders] = useState([]);
  const [isAddOrder, setIsAddOrder] = useState(true);

  const validateMerchantId = (merchantId) => {
    // Check if the length is not greater than 6
    if (merchantId?.length > 6) {
      return "Merchant ID must be at most 6 characters long.";
    }

    // Check if the first character is a letter
    if (!/^[a-zA-Z]/.test(merchantId)) {
      return "First character of Merchant ID must be a letter.";
    }

    // Check uniqueness (you need to implement this logic)
    const isUnique = !orders.some(order => order?.merchant_id === merchantId);
    if (!isUnique) {
      return "Merchant ID must be unique.";
    }

    return null; // Validation passed
  };


  useEffect(() => {
    console.log("orderToUpdate", orderToUpdate);
    if (orderToUpdate !== null) {
      setOrdersData(orderToUpdate);
      setIsAddOrder(false);
    } else {
      setOrdersData({
        merchant_id: "",
        merchant: "",
        receiver: "",
        location: "",
        order_date: "",
        delivery_date: "",
        updated_date: new Date().toISOString().split('T')[0],
        price: "",
        note: "",
        status: "pending",
      });
      setIsAddOrder(true);
    }
  }, [orderToUpdate]);


  useEffect(() => {
    dataFetch()
    MerchanrDataFetch()
  }, [])

  //fetch data 
  const dataFetch = async () => {
    try {

      const response = await axios.get('http://localhost:5001/order')
      setOrders(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // fetch merchant names


  const MerchanrDataFetch = async () => {
    try {

      const response = await axios.get('http://localhost:5001/merchants')
      const merchantNames = response.data.map(merchant => merchant.merchant_name);
      setMerchantName(merchantNames);
    } catch (error) {
      console.log(error)
    }
  }

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const handleAddOrder = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setOrdersData({ ...ordersData, [name]: value });
  }


  const handleUpdateOrder = (order) => {
    console.log(order)
    setOrderToUpdate(order)
    setShowModal(true)
  }



  const handleSaveOrder = async (isAddOrder) => {
    const merchantIdValidation = validateMerchantId(ordersData.merchant_id);
    if (merchantIdValidation) {
      // Display error message
      console.error(merchantIdValidation);
      return;
    }

    if (isAddOrder) {
      setOrders([...orders, ordersData]);
    } else {
      setOrders(
        orders.map((item) => {
          if (item.id === ordersData.id) {
            return ordersData
          }

          return item
        })
      )
    }

    await postOrderData(ordersData);



    setShowModal(false);
    setOrdersData({
      merchant: "",
      receiver: "",
      location: "",
      order_date: "",
      delivery_date: "",
      updated_date: new Date().toISOString().split('T')[0],
      price: "",
      note: "",
      status: "pending",
    });
  };


  const postOrderData = async (orderData) => {
    try {
      const response = await fetch('http://localhost:5001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
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


  const handleDeleteOrder = (id) => {
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
        const filterAfterDelete = orders.filter(item => item.id !== id);
        setOrders(filterAfterDelete);

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
                onClick={handleAddOrder}
              >
                Add Order
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
                          {isAddOrder ? 'Add Order' : " Edit Order"}
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
                          <CRow>
                            <CCol xs="6" className="pr-2">
                              <CFormGroup>
                                <CLabel htmlFor="merchant_id">Merchant ID</CLabel>
                                <CInput
                                  id="merchant_id"
                                  name="merchant_id"
                                  value={ordersData.merchant_id}
                                  onChange={handleChange}
                                  placeholder="Enter merchant ID"
                                  maxLength={6}
                                />
                                {validateMerchantId(ordersData.merchant_id) && (
                                  <div className="text-danger small">{validateMerchantId(ordersData.merchant_id)}</div>
                                )}
                              </CFormGroup>

                            </CCol>

                            <CCol xs="6" className="pr-2">
                              <CFormGroup>
                                <CLabel htmlFor="merchant">Merchant</CLabel>
                                <CSelect
                                  id="merchant"
                                  name="merchant"
                                  value={ordersData.merchant}
                                  onChange={handleChange}
                                >
                                  <option value="">Select Merchant</option>
                                  {merchantName &&
                                    merchantName.map((name, index) => (
                                      <option key={index} value={name}>
                                        {name}
                                      </option>
                                    ))}
                                </CSelect>
                              </CFormGroup>
                            </CCol>

                          </CRow>



                          <CRow>
                            <CCol xs="6" className="pr-2">
                              <CFormGroup>
                                <CLabel htmlFor="receiver">Receiver</CLabel>
                                <CInput
                                  id="receiver"
                                  name="receiver"
                                  value={ordersData.receiver}
                                  onChange={handleChange}
                                  placeholder="Enter receiver"
                                />
                              </CFormGroup>

                            </CCol>

                            <CCol xs="6" className="pr-2">
                              <CFormGroup>
                                <CLabel htmlFor="location">Location</CLabel>
                                <CInput
                                  id="location"
                                  name="location"
                                  value={ordersData.location}
                                  onChange={handleChange}
                                  placeholder="Enter location"
                                />
                              </CFormGroup>

                            </CCol>
                          </CRow>

                          <CRow>
                            <CCol xs="6" className="pr-2">
                              <CFormGroup>
                                <CLabel htmlFor="order_date">Order Date</CLabel>
                                <CInput
                                  type="date"
                                  id="order_date"
                                  name="order_date"
                                  value={ordersData.order_date}
                                  onChange={handleChange}
                                />
                              </CFormGroup>
                            </CCol>

                            <CCol xs="6" className="pr-2">
                              <CFormGroup>
                                <CLabel htmlFor="delivery_date">Delivery Date</CLabel>
                                <CInput
                                  type="date"
                                  id="delivery_date"
                                  name="delivery_date"
                                  value={ordersData.delivery_date}
                                  onChange={handleChange}
                                />
                              </CFormGroup>
                            </CCol>
                          </CRow>

                          <CRow>
                            <CCol xs="6" className="pr-2">
                              <CFormGroup>
                                <CLabel htmlFor="updated_date">Updated Date</CLabel>
                                <CInput
                                  type="date"
                                  id="updated_date"
                                  name="updated_date"
                                  value={ordersData.updated_date}
                                  onChange={handleChange}
                                  disabled
                                />
                              </CFormGroup>

                            </CCol>

                            <CCol xs="6" className="pr-2">
                              <CFormGroup>
                                <CLabel htmlFor="price">Price</CLabel>
                                <CInput
                                  type="number"
                                  id="price"
                                  name="price"
                                  value={ordersData.price}
                                  onChange={handleChange}
                                  placeholder="Enter price"
                                />
                              </CFormGroup>
                            </CCol>
                          </CRow>

                          <CRow>
                            <CCol xs="6" className="pr-2">
                              <CFormGroup>
                                <CLabel htmlFor="note">Note</CLabel>
                                <CTextarea
                                  id="note"
                                  name="note"
                                  rows="3"
                                  value={ordersData.note}
                                  onChange={handleChange}
                                  placeholder="Enter notee"
                                />
                              </CFormGroup>
                            </CCol>

                            <CCol xs="6" className="pr-2">
                              <CFormGroup>
                                <CLabel htmlFor="status">Status</CLabel>
                                <CSelect
                                  id="status"
                                  name="status"
                                  value={ordersData.status}
                                  onChange={handleChange}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="canceled">Canceled</option>
                                </CSelect>
                              </CFormGroup>
                            </CCol>
                          </CRow>
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
                        <button onClick={() => handleSaveOrder(isAddOrder)} type="button" className="btn btn-primary">
                          {isAddOrder ? 'Add' : "Update"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CCardHeader>

            <CCardBody>
              <CDataTable
                items={orders}
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
                  'name':
                    (item) => (
                      <td>
                        <div>{item.name}</div>
                        <div className="small text-muted">
                          <span>{item?.type}</span> | {item?.registered}
                        </div>
                      </td>
                    ),
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item?.status)}>
                          {item?.status}
                        </CBadge>
                      </td>
                    ),
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
                              {item?.username}
                            </h4>
                            <p className="text-muted">
                              Merchant: {item?.merchant}<br />
                              Receiver: {item?.receiver}<br />
                              Location: {item?.location}<br />
                              Order date: {item?.order_date}<br />
                              Delivery date: {item?.delivery_date}<br />
                              Updated date: {item?.updated_date}<br />
                              Price: {item?.price}<br />
                              Note: {item?.note}<br />
                              Status: {item?.status}<br />
                            </p>
                            <CButton onClick={() => handleUpdateOrder(item)} size="sm" color="info">
                              Update
                            </CButton>
                            <CButton onClick={() => handleDeleteOrder(item.id)} size="sm" color="danger" className="ml-1">
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

export default Orders
