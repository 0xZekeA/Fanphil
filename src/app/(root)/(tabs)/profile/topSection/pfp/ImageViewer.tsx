import useGetUsersPfp from "@/hooks/getUsersPfp.hooks";
import { useAuthProvider } from "@/providers/auth";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { usePfpProvider } from "../../providers/PfpProvider";
import styles from "../../styles/styles";

const Viewer = () => {
  const { user } = useAuthProvider();
  const { viewPfp, setViewPfp, editPfp, imagePubID, loading, cloudinaryUrl } =
    usePfpProvider();

  const pfpUrl = useGetUsersPfp(user);

  return (
    <Modal visible={viewPfp} transparent>
      <View className="justify-between flex-row" />
      <ImageViewer
        imageUrls={[
          {
            url:
              pfpUrl ||
              (imagePubID.startsWith("http") ? imagePubID : cloudinaryUrl),
          },
        ]}
        renderHeader={() => (
          <View className="justify-between relative flex-row">
            <TouchableOpacity
              onPress={() => setViewPfp(false)}
              style={[styles.imgViewerBtn, { left: 25 }]}
            >
              <Text style={styles.imgViewerText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.imgViewerBtn, { right: 25 }]}
              onPress={editPfp}
            >
              <Text style={styles.imgViewerText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
        loadingRender={() => (
          <View style={styles.imgActivityIndicator}>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </View>
        )}
        renderIndicator={() =>
          loading ? (
            <View style={styles.imgActivityIndicator}>
              <ActivityIndicator size="small" color="#FFFFFF" />
            </View>
          ) : (
            <></>
          )
        }
      />
    </Modal>
  );
};

export default Viewer;
