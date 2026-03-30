import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Keyboard, Image, ActivityIndicator,
  Linking, Platform, StatusBar,
} from 'react-native';
import { CameraView, Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ScanMode = 'food' | 'material' | 'barcode';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

type CapturedPhoto = {
  uri: string;
  base64?: string | null;
};

export default function ScanScreen({ navigation }: Props) {
  const [permission, setPermission] = useState<boolean | null>(null);
  const [mode, setMode] = useState<ScanMode>('food');
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [searchText, setSearchText] = useState('');
  const cameraRef = useRef<CameraView>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  // Reset state when screen comes back into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCapturedPhoto(null);
      setScanned(false);
      setSearchText('');
      setIsCapturing(false);
    });
    return unsubscribe;
  }, [navigation]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) return;
    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.7,
      });
      setCapturedPhoto(photo as CapturedPhoto);
    } catch (e) {
      console.error('Capture failed:', e);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleConfirmPhoto = () => {
    if (!capturedPhoto) return;
    navigation.navigate('Result', {
      type: 'photo',
      mode,
      image: capturedPhoto.base64 ?? '',
      uri: capturedPhoto.uri,
    });
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
  };

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    navigation.navigate('Result', { type: 'barcode', query: data, mode: 'barcode' });
  };

  const handleManualSearch = () => {
    if (!searchText.trim()) return;
    Keyboard.dismiss();
    navigation.navigate('Result', {
      type: 'search',
      query: searchText.trim(),
      mode,
    });
  };

  // ── Permission states ──────────────────────────────────────────────────────

  if (permission === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#4A9B5F" />
      </View>
    );
  }

  if (permission === false) {
    return (
      <View style={styles.centered}>
        <StatusBar barStyle="light-content" backgroundColor="#0E1A0F" />
        <Ionicons name="camera-outline" size={48} color="#4A6E4D" style={{ marginBottom: 20 }} />
        <Text style={styles.permTitle}>Camera Access Needed</Text>
        <Text style={styles.permBody}>
          Green Life needs camera access to scan food, materials, and barcodes.
        </Text>
        <TouchableOpacity style={styles.permBtn} onPress={() => Linking.openSettings()} activeOpacity={0.8}>
          <Text style={styles.permBtnText}>Open Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Preview screen ─────────────────────────────────────────────────────────

  if (capturedPhoto) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <Image source={{ uri: capturedPhoto.uri }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />

        {/* Dark overlay */}
        <View style={styles.previewOverlay} pointerEvents="none" />

        {/* Top label */}
        <View style={[styles.previewTopBar, { paddingTop: insets.top + 16 }]}>
          <Text style={styles.previewLabel}>
            {mode === 'food' ? '🍽  Food scan' : '♻️  Material scan'}
          </Text>
          <Text style={styles.previewSub}>Does this look right?</Text>
        </View>

        {/* Bottom actions */}
        <View style={[styles.previewActions, { paddingBottom: insets.bottom + 24 }]}>
          <TouchableOpacity style={styles.retakeBtn} onPress={handleRetake} activeOpacity={0.8}>
            <Ionicons name="refresh-outline" size={18} color="#F5F3EF" style={{ marginRight: 8 }} />
            <Text style={styles.retakeBtnText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmPhoto} activeOpacity={0.85}>
            <Ionicons name="checkmark" size={18} color="#F5F3EF" style={{ marginRight: 8 }} />
            <Text style={styles.confirmBtnText}>Use Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Main camera screen ─────────────────────────────────────────────────────

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Camera area — flex:1 so it stops above bottom panel */}
      <View style={styles.cameraArea}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={mode === 'barcode' && !scanned ? handleBarcodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'qr', 'code128', 'code39'],
        }}
      />

      {/* Barcode mode: vignette + viewfinder overlay */}
      {mode === 'barcode' && (
        <View style={styles.barcodeOverlay} pointerEvents="none">
          <View style={styles.overlayTop} />
          <View style={styles.overlayMiddleRow}>
            <View style={styles.overlaySide} />
            <View style={styles.viewfinder}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </View>
            <View style={styles.overlaySide} />
          </View>
          <View style={styles.overlayBottom} />
        </View>
      )}

      {/* Food/Material mode: subtle vignette only */}
      {mode !== 'barcode' && (
        <View style={styles.photoVignette} pointerEvents="none" />
      )}

      {/* Top bar: logo + mode toggle */}
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.topLogo}>
          <Text style={styles.topLogoWhite}>GREEN</Text>
          {'  '}
          <Text style={styles.topLogoGreen}>LIFE</Text>
        </Text>

        {/* Mode toggle */}
        <View style={styles.modeToggle}>
          {(['food', 'material', 'barcode'] as ScanMode[]).map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.modeBtn, mode === m && styles.modeBtnActive]}
              onPress={() => { setMode(m); setScanned(false); }}
              activeOpacity={0.8}
            >
              <Text style={[styles.modeBtnText, mode === m && styles.modeBtnTextActive]}>
                {m === 'food' ? 'Food' : m === 'material' ? 'Material' : 'Barcode'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Mode instruction */}
      <View style={styles.instructionWrap} pointerEvents="none">
        <Text style={styles.instructionText}>
          {mode === 'food'
            ? 'Point at your meal to scan'
            : mode === 'material'
            ? 'Point at packaging or materials'
            : scanned
            ? 'Found — loading result…'
            : 'Point at a barcode to scan'}
        </Text>
      </View>

      {/* Shutter button (food/material only) */}
      {mode !== 'barcode' && (
        <View style={[styles.shutterWrap, { paddingBottom: 40 }]}>
          <TouchableOpacity
            style={[styles.shutterBtn, isCapturing && styles.shutterBtnCapturing]}
            onPress={handleCapture}
            activeOpacity={0.85}
            disabled={isCapturing}
          >
            {isCapturing
              ? <ActivityIndicator color="#F5F3EF" size="small" />
              : <View style={styles.shutterInner} />
            }
          </TouchableOpacity>
        </View>
      )}

      </View>{/* end cameraArea */}

      {/* Bottom panel: manual search — normal flow, not absolute */}
      <View style={[styles.bottomPanel, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.orLabel}>
          {mode === 'barcode' ? 'or enter a product name' : `or search by ${mode === 'food' ? 'food name' : 'material'}`}
        </Text>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder={
              mode === 'food'
                ? 'e.g. grilled salmon, beef burger'
                : mode === 'material'
                ? 'e.g. plastic straw, styrofoam cup'
                : 'e.g. Coca-Cola 12oz can'
            }
            placeholderTextColor="#4A6E4D"
            returnKeyType="search"
            onSubmitEditing={handleManualSearch}
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={handleManualSearch} activeOpacity={0.8}>
            <Ionicons name="arrow-forward" size={18} color="#F5F3EF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const VIEWFINDER_SIZE = 260;
const CORNER_SIZE = 22;
const CORNER_THICKNESS = 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'column',
  },
  cameraArea: {
    flex: 1,
    overflow: 'hidden',
  },
  centered: {
    flex: 1,
    backgroundColor: '#0E1A0F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },

  // Permission
  permTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#F5F3EF',
    marginBottom: 10,
    textAlign: 'center',
  },
  permBody: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 14,
    color: '#4A6E4D',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  permBtn: {
    backgroundColor: '#2F6B3B',
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  permBtnText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    color: '#F5F3EF',
  },

  // Photo preview
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  previewTopBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 12,
  },
  previewLabel: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#F5F3EF',
    marginBottom: 4,
  },
  previewSub: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 13,
    color: 'rgba(245,243,239,0.65)',
  },
  previewActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
    backgroundColor: 'rgba(14,26,15,0.88)',
    borderTopWidth: 1,
    borderTopColor: '#1A2E1C',
  },
  retakeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2F6B3B',
    borderRadius: 10,
    paddingVertical: 14,
  },
  retakeBtnText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 15,
    color: '#F5F3EF',
  },
  confirmBtn: {
    flex: 1.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F6B3B',
    borderRadius: 10,
    paddingVertical: 14,
  },
  confirmBtnText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 15,
    color: '#F5F3EF',
  },

  // Barcode overlay
  barcodeOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.62)',
  },
  overlayMiddleRow: {
    flexDirection: 'row',
    height: VIEWFINDER_SIZE,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.62)',
  },
  overlayBottom: {
    flex: 1.6,
    backgroundColor: 'rgba(0,0,0,0.62)',
  },
  viewfinder: {
    width: VIEWFINDER_SIZE,
    height: VIEWFINDER_SIZE,
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: '#C8A96E',
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: CORNER_THICKNESS, borderLeftWidth: CORNER_THICKNESS },
  cornerTR: { top: 0, right: 0, borderTopWidth: CORNER_THICKNESS, borderRightWidth: CORNER_THICKNESS },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: CORNER_THICKNESS, borderLeftWidth: CORNER_THICKNESS },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: CORNER_THICKNESS, borderRightWidth: CORNER_THICKNESS },

  // Photo vignette
  photoVignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderWidth: 60,
    borderColor: 'rgba(0,0,0,0.3)',
  },

  // Top bar
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  topLogo: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    marginBottom: 14,
  },
  topLogoWhite: {
    color: '#F5F3EF',
    letterSpacing: 5,
  },
  topLogoGreen: {
    color: '#4A9B5F',
    letterSpacing: 5,
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(14,26,15,0.82)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1A2E1C',
    padding: 3,
    gap: 2,
  },
  modeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 7,
  },
  modeBtnActive: {
    backgroundColor: '#2F6B3B',
  },
  modeBtnText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: 'rgba(245,243,239,0.55)',
  },
  modeBtnTextActive: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#F5F3EF',
  },

  // Instruction
  instructionWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '58%',
    alignItems: 'center',
  },
  instructionText: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 13,
    color: 'rgba(245,243,239,0.75)',
    letterSpacing: 0.3,
  },

  // Shutter
  shutterWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  shutterBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 3,
    borderColor: '#F5F3EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterBtnCapturing: {
    backgroundColor: 'rgba(74,155,95,0.4)',
    borderColor: '#4A9B5F',
  },
  shutterInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F5F3EF',
  },

  // Bottom panel
  bottomPanel: {
    paddingHorizontal: 24,
    paddingTop: 14,
    backgroundColor: 'rgba(14,26,15,0.92)',
    borderTopWidth: 1,
    borderTopColor: '#1A2E1C',
  },
  orLabel: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 10,
    color: '#4A6E4D',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#121E13',
    borderWidth: 1,
    borderColor: '#2F6B3B',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#F5F3EF',
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 13,
  },
  searchBtn: {
    width: 46,
    backgroundColor: '#2F6B3B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
