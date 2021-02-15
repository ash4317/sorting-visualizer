def swap(arr, i, j):
    temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    

def valid_child(i, n):
    """Valid child if arr[i] exists"""
    if i >= n:
        return False
    return True

def index_of_greater_child(arr, i, n):
    """Returns index of greater child. -1 if no child or no greater child"""
    if i >= n / 2:
        return -1
    
    left_index, right_index = 2 * i + 1, 2 * (i + 1)

    if valid_child(left_index, n) and valid_child(right_index, n):
        #if both children exist

        if min(arr[i], arr[left_index], arr[right_index]) == arr[i]:
            #if parent is less than both children

            if arr[left_index] > arr[right_index]:
                #arr[left_index] is greatest element
                return left_index
            #arr[right_index] is greatest
            return right_index
        
        #return index of greatest element
        if arr[i] < arr[left_index]:
            return left_index
        if arr[i] < arr[right_index]:
            return right_index

        return -1 #ar[i] is greatest element. So, already a max heap. Hence, -1

    if valid_child(left_index, n):
        #right child not a valid child
        if arr[i] < arr[left_index]:
            return left_index
        return -1

    return -1 #both children not valid

def max_heapify(arr, i, n, res):
    """Makes subtree with root at ith index a max heap"""

    global count
    j = index_of_greater_child(arr, i, n)
    if j != -1:
        swap(arr, i, j)
        count += 1
        res[count] = [] + arr + [i, j]
        max_heapify(arr, j, n, res)

def build_max_heap(arr, n, res):
    """Converts array to max heap"""

    for i in range((n//2) - 1, -1, -1):
        max_heapify(arr, i, n, res)

def heapsort(arr, n, res):
    global count
    build_max_heap(arr, n, res) #convert array to max heap

    #for every element, convert array to max heap which will bring largest element to the 0th index. Then, swap with last position
    for i in range(n - 1):
        max_heapify(arr, 0, n - i, res)
        swap(arr, 0, n - i - 1)
        count += 1
        res[count] = [] + arr + [0, n - i - 1]

def main(arr):
    res = {1 : [] + arr}
    heapsort(arr, len(arr), res)
    return res

count = 1