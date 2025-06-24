import { useState, useEffect, useRef, useCallback } from "react";

/**
 * A custom hook that provides debounced state update while allowing immediate input display
 * @param initialValue Initial input value
 * @param delay Debounce delay in milliseconds
 * @returns Object containing value and handleChange function
 */
export function useDebouncedInput(initialValue: string = "", delay: number = 300) {
  // Giá trị hiển thị ngay lập tức trong input
  const [inputValue, setInputValue] = useState(initialValue);
  
  // Giá trị debounced để sử dụng trong các effects hoặc logic khác
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  
  // Debounce timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Cập nhật giá trị input ngay lập tức và setup debounce cho debouncedValue
  const handleInputChange = useCallback((newValue: string | React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = typeof newValue === "string" ? newValue : newValue.target.value;
    
    // Cập nhật input ngay lập tức cho UX tốt
    setInputValue(value);
    
    // Clear bộ đếm thời gian cũ
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Thiết lập bộ đếm mới cho giá trị debounced
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
      console.log('Debounced value updated:', value);
    }, delay);
  }, [delay]);
  
  // Dọn dẹp timer khi component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  // Xóa input
  const clearInput = useCallback(() => {
    setInputValue("");
    setDebouncedValue("");
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);
  
  return {
    // Giá trị hiện tại của input (cập nhật ngay lập tức)
    value: inputValue,
    // Giá trị đã được debounce (chỉ cập nhật sau delay)
    debouncedValue,
    // Hàm xử lý sự kiện thay đổi
    setValue: handleInputChange,
    // Hàm xóa input
    clearInput
  };
} 