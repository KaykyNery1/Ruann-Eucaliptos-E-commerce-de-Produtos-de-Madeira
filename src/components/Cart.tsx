import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart, Trash2, MapPin, User, Mail } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const [address, setAddress] = useState({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: 'DF',
    zipCode: '',
    document: ''
  });
  const [payment, setPayment] = useState({
    method: '',
    cardBrand: ''
  });
  const [addressErrors, setAddressErrors] = useState<{[key: string]: string}>({});
  const [paymentErrors, setPaymentErrors] = useState<{[key: string]: string}>({});

  // CPF validation
  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false; // All same digits
    
    // Validate check digits
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
    
    return true;
  };

  // CNPJ validation
  const validateCNPJ = (cnpj: string): boolean => {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    if (cleanCNPJ.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false; // All same digits
    
    // Validate first check digit
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weights1[i];
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    if (digit1 !== parseInt(cleanCNPJ.charAt(12))) return false;
    
    // Validate second check digit
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;
    if (digit2 !== parseInt(cleanCNPJ.charAt(13))) return false;
    
    return true;
  };

  // Format CPF or CNPJ
  const formatDocument = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 11) {
      // Format as CPF
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
      if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
    } else {
      // Format as CNPJ
      if (digits.length <= 2) return digits;
      if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
      if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
      if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
    }
  };

  // Validate document (CPF or CNPJ)
  const validateDocument = (document: string): boolean => {
    const digits = document.replace(/\D/g, '');
    
    if (digits.length === 11) {
      return validateCPF(document);
    } else if (digits.length === 14) {
      return validateCNPJ(document);
    }
    
    return false;
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const validateAddress = () => {
    const errors: {[key: string]: string} = {};
    
    if (!address.street.trim()) errors.street = 'Rua é obrigatória';
    if (!address.number.trim()) errors.number = 'Número é obrigatório';
    if (!address.neighborhood.trim()) errors.neighborhood = 'Bairro é obrigatório';
    if (!address.city.trim()) errors.city = 'Cidade é obrigatória';
    if (!address.zipCode.trim()) errors.zipCode = 'CEP é obrigatório';
    if (!address.document.trim()) errors.document = 'CPF ou CNPJ é obrigatório';
    else if (!validateDocument(address.document)) {
      const digits = address.document.replace(/\D/g, '');
      if (digits.length === 11) {
        errors.document = 'CPF inválido';
      } else if (digits.length === 14) {
        errors.document = 'CNPJ inválido';
      } else {
        errors.document = 'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos';
      }
    }
    
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = () => {
    const errors: {[key: string]: string} = {};
    
    if (!payment.method) errors.method = 'Método de pagamento é obrigatório';
    if ((payment.method === 'credit' || payment.method === 'debit') && !payment.cardBrand) {
      errors.cardBrand = 'Bandeira do cartão é obrigatória';
    }
    
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddressSubmit = () => {
    if (validateAddress()) {
      setShowAddressForm(false);
      setShowPaymentForm(true);
    }
  };

  const handlePaymentSubmit = () => {
    if (validatePayment()) {
      setShowPaymentForm(false);
      setShowConfirmation(true);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDocument(e.target.value);
    setAddress(prev => ({ ...prev, document: formatted }));
  };

  const handleCheckout = async () => {
    if (!showAddressForm) {
      setShowAddressForm(true);
      return;
    }
  };

  const confirmOrder = async () => {
    if (!currentUser || state.items.length === 0) return;
    
    setIsProcessing(true);

    // Prepare WhatsApp message
    const customerName = currentUser.displayName || currentUser.email;
    const whatsappNumber = "556199910956";
    
    let message = `*PEDIDO - RUANN EUCALIPTOS*\n\n`;
    message += `*Cliente:* ${customerName}\n`;
    const documentType = address.document.replace(/\D/g, '').length === 11 ? 'CPF' : 'CNPJ';
    message += `*${documentType}:* ${address.document}\n`;
    message += `*Email:* ${currentUser.email}\n`;
    message += `*Endereço de Entrega:* ${address.street}, ${address.number}, ${address.neighborhood} - ${address.city}/${address.state}, CEP: ${address.zipCode}\n\n`;
    
    // Add payment method
    let paymentText = '';
    switch (payment.method) {
      case 'pix':
        paymentText = 'PIX';
        break;
      case 'credit':
        paymentText = `Cartão de Crédito (${payment.cardBrand})`;
        break;
      case 'debit':
        paymentText = `Cartão de Débito (${payment.cardBrand})`;
        break;
      case 'cash':
        paymentText = 'Dinheiro';
        break;
    }
    message += `*Forma de Pagamento:* ${paymentText}\n`;
    message += `*Itens do Pedido:*\n`;
    
    state.items.forEach((item) => {
      message += `${item.quantity}x ${item.name} - R$ ${item.price.toFixed(2)} cada (${item.weight}kg cada)\n`;
    });
    
    message += `\n*TOTAL: R$ ${state.total.toFixed(2)}*\n`;
    message += `*Peso total: ${state.totalWeight.toFixed(1)}kg*\n\n`;
    message += `Gostaria de finalizar este pedido. Aguardo retorno para combinar entrega e pagamento.`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(url, '_blank');
    
    // Clear cart after successful checkout
    setTimeout(() => {
      clearCart();
      setShowConfirmation(false);
      setShowAddressForm(false);
      setShowPaymentForm(false);
      setAddress({ street: '', number: '', neighborhood: '', city: '', state: 'DF', zipCode: '', document: '' });
      setPayment({ method: '', cardBrand: '' });
      onClose();
      setIsProcessing(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Cart Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[999999]" onClick={onClose}></div>
      
      {/* Cart Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-[999999] transform transition-transform duration-300 ease-in-out">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Carrinho ({state.items.length})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Seu carrinho está vazio</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">{item.weight}kg cada</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-emerald-600">
                  R$ {state.total.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">Peso total:</span>
                <span className="text-sm font-medium text-gray-900">
                  {state.totalWeight.toFixed(1)}kg
                </span>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Continuar para Endereço
              </button>
              
              <button
                onClick={clearCart}
                className="w-full mt-2 py-2 px-4 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Limpar Carrinho
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Address Form Modal - CENTRALIZED */}
      {showAddressForm && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Endereço de Entrega
              </h3>
              <button
                onClick={() => setShowAddressForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${addressErrors.street ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Nome da rua"
                  />
                  {addressErrors.street && <p className="text-red-600 text-xs mt-
