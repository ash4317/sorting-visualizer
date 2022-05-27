def bubble_sort(arr):
	result = {1 : [] + arr}
	count = 1
	for i in range(len(arr)):
		for j in range(len(arr) - i - 1):
			if arr[j] > arr[j + 1]:
				temp = arr[j + 1]
				arr[j + 1] = arr[j]
				arr[j] = temp
			count += 1
			result[count] = [] + arr + [j, j + 1] #last two elements are the indices that are to be swapped
	return result