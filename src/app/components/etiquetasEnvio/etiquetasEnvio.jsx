import React from "react";
import {
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Document,
} from "@react-pdf/renderer";
// Asegúrate de convertir tu logo y el código QR a formato base64 para su uso en el PDF

const styles = StyleSheet.create({
  Contenedor: {
    width: 225,
    height: 354,
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid black",
  },
  ContenedorRemitente: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: "column",
    marginBottom: 5,
  },
  destinatarioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  destinatarioInformation: {
    flexDirection: "column",
    marginBottom: 5,
  },
  textContainerDes: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    backgroundColor: "black",
    width: "100%",
    height: 2,
    marginVertical: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  destinatarioTitleb: {
    fontSize: 7.5,
    fontWeight: "bold",
  },
  destinatarioTitlec: {
    fontSize: 7.5,
    fontWeight: "normal",
  },
  destinatarioTitleE: {
    fontSize: 15,
    fontWeight: "bold",
  },
  destinatarioTitleD: {
    fontSize: 15,
    fontWeight: "ultralight",
  },
  qrCanvas: {
    marginRight: 10,
  },
  logoContainer: {
    marginTop: 10,
  },
});

function PdfDocument(props) {
  return (
    <Document>
      <Page style={styles.Contenedor}>
        <View style={styles.ContenedorRemitente}>
          <View style={styles.textContainer}>
            <Text style={styles.destinatarioTitleb}>Remitente REAL COVER</Text>
            <Text style={styles.destinatarioTitlec}>
              Devolver a BUENOS AIRES, C.A.B.A,
            </Text>
            <Text style={styles.destinatarioTitleE}>JUNCAL 3408</Text>
            <Text style={styles.destinatarioTitleE}>1154231080</Text>
          </View>
        </View>

        <View style={styles.line}></View>

        <View style={styles.destinatarioContainer}>
          <View style={styles.destinatarioInformation}>
            <Text style={styles.destinatarioTitleb}>
              Destinatario: Nombre Apellido
            </Text>
            <View style={styles.textContainerDes}>
              <Text style={styles.destinatarioTitleb}>Domicilio:</Text>
              <Text style={styles.destinatarioTitlec}> user.domicilio</Text>
            </View>
            <View style={styles.textContainerDes}>
              <Text style={styles.destinatarioTitleE}>CP</Text>
              <Text style={styles.destinatarioTitleD}> 1425</Text>
            </View>
            <View style={styles.textContainerDes}>
              <Text style={styles.destinatarioTitleb}>Ciudad De Destino</Text>
              <Text style={styles.destinatarioTitlec}> Buenos Aires</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerContainer}>
          {/* El código QR deberá convertirse en una imagen base64 para poder incrustarlo */}
          <Image
            source={{ uri: "data:image/png;base64, [BASE_64_DEL_QR]" }}
            style={styles.qrCanvas}
          />
          <View style={styles.logoContainer}>
            <Image
              src={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/logoDashboardBlack.png?alt=media&token=316899ca-78f9-4dbf-9278-29903fb9d61f",
              }}
              style={{ width: 100, height: 50 }}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PdfDocument;
