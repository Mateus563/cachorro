import { useEffect ,useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";

export default function cachorro() {
  const [imagem, setImagem] = useState("");
  const [erro, setErro] = useState("");

  async function buscar() {
    const resposta = await fetch("https://dog.ceo/api/breeds/image/random");
    
      const dados = await resposta.json();

      if (dados.status === "success") {
        setErro("");
        setImagem(dados.message);
      } else {
        setErro("Não foi possível carregar a imagem.");
        setImagem("");
      }
    }

    useEffect(() => {
    buscar();
  }, []);

    return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Cachorros</Text>

      {erro !== "" && (
        <Text style={styles.erro}>{erro}</Text>
      )}

      {imagem !== "" && (
        <Image
          source={{ uri: imagem }}
          style={styles.imagem}
          resizeMode="contain"
        />
      )}

      <Button
        title="Outro cachorro"
        onPress={buscar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    gap: 6,
  },

  imagem: {
    width: "100%",
    height: 320,
    marginBottom: 20,
  },

  erro: {
    marginTop: 16,
    color: "#B91C1C",
  },

  titulo: {
    fontSize: 16,
    fontWeight: "600",
  },
});
