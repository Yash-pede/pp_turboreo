import { DateField, useModalForm } from "@refinedev/antd";
import { AllOrders } from "./AllOrders";
import { GET_ALL_ORDERS_QUERY, UPDATE_ORDERS_MUTATION } from "@repo/graphql";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useGo, useList } from "@refinedev/core";
import { useLocation } from "react-router-dom";
import { OrderStatus } from "@repo/utility";
import { useEffect } from "react";

export const EditOrders = () => {
  const orderId = useLocation().pathname.split("/").pop();
  const go = useGo();
  const RouteToOrders = () => {
    go({
      to: { resource: "orders", action: "list" },
      type: "push",
      options: { keepQuery: true },
    });
  };
  const { modalProps, formProps, formLoading } = useModalForm({
    action: "edit",
    resource: "ORDERS",
    redirect: "show",
    id: orderId,
    defaultVisible: true,
    meta: {
      gqlMutation: UPDATE_ORDERS_MUTATION,
    },
    onMutationSuccess() {
      RouteToOrders();
    },
  });

  const { data, isLoading } = useList({
    resource: "ORDERS",
    queryOptions: {
      meta: {
        gqlQuery: GET_ALL_ORDERS_QUERY,
      },
    },
    filters: [
      {
        field: "id",
        operator: "eq",
        value: orderId,
      },
    ],
  });
  useEffect(() => {
    if (!isLoading && formProps?.form) {
      formProps.form.setFieldsValue({ ...data?.data[0] });
    }
  }, [isLoading, formProps?.form, data?.data]);
  return (
    <AllOrders>
      <Modal
        {...modalProps}
        afterClose={RouteToOrders}
        confirmLoading={isLoading || formLoading}
      >
        <Form
          {...formProps}
          layout="vertical"
          style={{ width: "100%", gap: "10px" }}
        >
          <Form.Item style={{ width: "100%" }} name="id" label="Order Id">
            <Input min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item style={{ width: "100%" }} name="user_id" label="User Id">
            <Input min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            name="product_id"
            label="Product"
          >
            <Input min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item style={{ width: "100%" }} name="quantity" label="Quantity">
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item style={{ width: "100%" }} name="status" label="Status">
            <Select
              placeholder="Select a status"
              options={[
                { label: "Pending", value: OrderStatus.PENDING },
                { label: "Fulfilled", value: OrderStatus.FULFILLED },
                { label: "Cancelled", value: OrderStatus.CANCELLED },
                { label: "Inprocess", value: OrderStatus.INPROCESS },
              ]}
            />
          </Form.Item>

          {/* <Form.Item
            label="Batch"
            name={"batch_no"}
            required
            style={{ width: "100%" }}
          >
            <BatchInput
              quantity={formProps.form?.getFieldValue("quantity")}
              productId={formProps.form?.getFieldValue("product_id")}
            />
          </Form.Item> */}

          <Form.Item
            style={{ width: "100%" }}
            name="created_at"
            label="Created at"
          >
            <DateField
              value={data?.data[0].created_at}
              format="LLL"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </AllOrders>
  );
};
// const BatchInput = ({
//   quantity,
//   productId,
// }: {
//   quantity: number;
//   productId: string;
// }) => {
//   const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
//   const { data: batches, isLoading: isLoadingBatches } = useList({
//     resource: "STOCKS",
//     meta: {
//       gqlQuery: GET_ALL_STOCKS_QUERY,
//     },
//     filters: [
//       {
//         field: "product_id",
//         operator: "eq",
//         value: productId,
//       },
//     ],
//     sorters: [
//       {
//         field: "expiry_date",
//         order: "asc",
//       },
//     ],
//   });

//   useEffect(() => {
//     if (!isLoadingBatches && batches?.data) {
//       let remainingQuantity = quantity;
//       const initiallySelectedBatches: any[] = [];

//       for (const batch of batches.data) {
//         if (remainingQuantity > 0) {
//           const allocatedQuantity = Math.min(
//             remainingQuantity,
//             batch.avalable_quantity
//           );
//           remainingQuantity -= allocatedQuantity;

//           initiallySelectedBatches.push({
//             ...batch,
//             allocatedQuantity,
//           });
//         }
//       }

//       setSelectedBatches(initiallySelectedBatches);
//     }
//   }, [quantity, isLoadingBatches, batches]);

//   const handleBatchChange = (selectedBatchNumbers: string[] | undefined) => {
//     const selectedNumbers = selectedBatchNumbers ?? [];
//     let remainingQuantity = quantity;

//     const updatedBatches = (batches?.data ?? []).map((batch: any) => {
//       const allocatedQuantity = Math.min(
//         remainingQuantity,
//         batch.avalable_quantity
//       );
//       remainingQuantity -= allocatedQuantity;

//       return {
//         ...batch,
//         allocatedQuantity,
//       };
//     });

//     setSelectedBatches(updatedBatches);
//   };

//   return (
//     <span style={{ width: "100%" }}>
//       <Select
//         mode="multiple"
//         allowClear
//         style={{ width: "100%", gap: "5px" }}
//         placeholder="Select a batch"
//         value={selectedBatches.map((batch: any) => batch.batch_no)}
//         onChange={handleBatchChange}
//       >
//         {isLoadingBatches ? (
//           <Skeleton.Input />
//         ) : (
//           batches?.data.map((item: any) => (
//             <Select.Option key={item.id} value={item.batch_no}>
//               <div
//                 style={{
//                   display: "flex",
//                   width: "100%",
//                   gap: "10px",
//                   justifyContent: "space-between",
//                   marginRight: "3%",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "50%",
//                     display: "flex",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   {item.batch_no}
//                   <span>{item.avalable_quantity}</span>
//                 </div>
//                 <div> {item.expiry_date}</div>
//               </div>
//             </Select.Option>
//           ))
//         )}
//       </Select>
//     </span>
//   );
// };

// export default BatchInput;
