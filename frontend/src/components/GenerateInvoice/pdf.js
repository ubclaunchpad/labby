import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import UBC from "../../assets/UBC.png";

function PDF() {
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

  return (
    // <PDFViewer style={{ width: "100vw", height: "100vh" }}>
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
              <Image
                src={UBC}
                style={{ width: "60%", alignSelf: "flex-end" }}
              />
            </View>
          </View>
          <Text style={{ alignSelf: "center" }}>Unofficial Invoice</Text>
          <View style={styles.rowSection}>
            <View style={styles.section}>
              <Text style={styles.infoText}>Invoice Number:</Text>
              <Text style={styles.infoText}>Date:</Text>
              <Text style={styles.infoText}>Client:</Text>
              <Text style={styles.infoText}>E-mail:</Text>
              <Text style={styles.infoText}>Private Investigator:</Text>
              <Text style={styles.infoText}>Project Title:</Text>
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
          </View>
          <View style={styles.section}>
            <Text style={styles.infoText}>Bill To:</Text>
            <Text style={styles.infoText}>Contact:</Text>
            <Text style={styles.infoText}>Address/Department:</Text>
            <Text style={styles.infoText}>Worktag/Email:</Text>
          </View>
        </Page>
      </Document>
    // </PDFViewer>
  );
}

export default PDF;
