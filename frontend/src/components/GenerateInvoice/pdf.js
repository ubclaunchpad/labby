import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import UBC from "../../assets/UBC.png";

//Overwrite with relevant info when calling component
const todaysDate = new Date();
const defaultProps = {
  invoiceNumber: Math.floor(1e8 + Math.random() * 9e8), // TODO: Ensure uniqueness
  invoiceDate: `${todaysDate.getDate()}-${
    todaysDate.getMonth() + 1
  }-${todaysDate.getFullYear()}`,
  clientName: "Client's Name",
  clientEmail: "Client's Email",
  PI: "P.I. Name",
  projectTitle: "Title",
  billingContact: "Contact's Name",
  billingAddress: "Billing address",
  billingEmail: "Billing Email",
};

export const PDF = function ({
  invoiceNumber = defaultProps.invoiceNumber,
  invoiceDate = defaultProps.invoiceDate,
  clientName = defaultProps.clientName,
  clientEmail = defaultProps.clientEmail,
  PI = defaultProps.PI,
  projectTitle = defaultProps.projectTitle,
  billingContact = defaultProps.billingContact,
  billingAddress = defaultProps.billingAddress,
  billingEmail = defaultProps.billingEmail,
  billingData,
}) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      alignContent: "center",
    },
    rowSection: {
      flexDirection: "row",
      justifyContent: "center",
    },
    tableRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    infoText: {
      fontSize: "12px",
    },
  });

  // TODO: Fix bug preventing access to redux state from here
  // For now pass data from invoice page as prop
  // const billingData =  useSelector(
  //   (state) => state.billingReducer.billingList
  // );

  console.log("Billing data2:" + billingData);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.rowSection}>
          <View style={styles.section}>
            <Text>MAPcore</Text>
            <Text style={{ fontSize: "8px" }}>
              Molecular and Advanced Pathology Core
            </Text>
            <Text style={{ fontSize: "8px" }}>
              Room 509 - 2660 Oak Street, Vancouver, BC V6H 3Z6
            </Text>
          </View>
          <View style={styles.section}>
            <Image src={UBC} style={{ width: "60%", alignSelf: "flex-end" }} />
          </View>
        </View>
        <Text style={{ alignSelf: "center" }}>Unofficial Invoice</Text>
        <View style={styles.rowSection}>
          <View style={styles.section}>
            <Text style={styles.infoText}>Invoice Number: {invoiceNumber}</Text>
            <Text style={styles.infoText}>Date: {invoiceDate}</Text>
            <Text style={styles.infoText}>Client: {clientName}</Text>
            <Text style={styles.infoText}>E-mail: {clientEmail}</Text>
            <Text style={styles.infoText}>Private Investigator: {PI}</Text>
            <Text style={styles.infoText}>Project Title: {projectTitle}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.infoText}>Prepared By:</Text>
            <Text style={styles.infoText}>Julie Ho</Text>
            <Text style={styles.infoText}>Demo Details</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.tableRow}>
            <Text style={styles.infoText}>Description</Text>
            <Text style={styles.infoText}>Quantity</Text>
            <Text style={styles.infoText}>Unit Price</Text>
            <Text style={styles.infoText}>Total (CAD)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.infoText}> {billingData}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.infoText}>Bill To:</Text>
          <Text style={styles.infoText}>Contact: {billingContact}</Text>
          <Text style={styles.infoText}>
            Address/Department: {billingAddress}
          </Text>
          <Text style={styles.infoText}>Worktag/Email: {billingEmail}</Text>
        </View>
      </Page>
    </Document>
  );
};
